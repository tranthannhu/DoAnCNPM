import {
  Injectable,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../entity/user.entity';
import { getManager, Repository } from 'typeorm';
import { Role } from 'src/entity/role.entity';
import { UserRepository } from 'src/App/users/user.repository';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import {
  LoginDTO,
  RegisterDTO,
  ChangePwdDTO,
  EmployersDTO,
  UpdatePhoneNumber,
  UploadAvatar,
} from './auth.dto';
import { sign } from 'jsonwebtoken';
import { Payload } from 'src/types/payload';
import axios from 'axios';
import { AddressRepository } from '../address/address.repository';
import { Profile } from 'src/entity/profile.entity';
import { Job } from 'src/entity/job.entity';
import RoleId from 'src/types/RoleId';

@Injectable()
export class AuthServices {
  private job_recently = 'job_recently';
  constructor(
    private userRepository: UserRepository,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private addressRepository: AddressRepository,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) { }

  async getRolesPermission(role: string) {
    try {
      const rolePermission = await this.roleRepository.findOne({
        where: { role },
        relations: [
          'rolePermission',
          'rolePermission.permission',
          'rolePermission.permission.method',
          'rolePermission.permission.module',
        ],
      });
      return rolePermission;
    } catch (error) {
      throw new InternalServerErrorException('Interal Server Error');
    }
  }

  async getProfile(id: string) {
    const user = await this.userRepository.find({
      where: { id },
      relations: ['profile', 'address'],
      select: [
        'email',
        'id',
        'role',
        'roleId',
        'createdat',
        'updatedat',
        'profile',
      ],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async login(data: LoginDTO) {
    try {
      const user: User = await this.validateUser(data);
      if (!user.active) {
        throw new UnauthorizedException('User is Unauthorized');
      }
      user.ExpiredToken = false;
      this.userRepository.save(user);
      const payload: Payload = {
        id: user.id,
        role: user.role.role,
      };

      return {
        token: await this.signPayload(payload),
        id: user.id,
        email: user.email,
        profile: user.profile,
        role: user.role.role,
        roleId: user.roleId,
      };
    } catch (error) {
      console.log('-->err', error);

      throw error;
    }
  }
  async signPayload(payload: Payload) {
    return await sign(payload, process.env.SECRET_KEY, { expiresIn: '60d' });
  }

  async register(dto: RegisterDTO) {
    try {
      const data = this.userRepository.create({
        ...dto,
        profile: { name: dto.name },
      });
      await this.userRepository.save(data);
      return this.login({ password: dto.password, email: dto.email });
    } catch (error) {
      if (error.code == '23505') {
        throw new HttpException(
          {
            message: 'Email Already exists',
            code: HttpStatus.CONFLICT,
          },
          HttpStatus.CONFLICT,
        );
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async addLead(dto: EmployersDTO) {
    try {
      const manager = getManager();
      const cityArr = [];
      const provinces = await await axios.get(
        'https://vapi.vnappmob.com/api/province',
      );
      let query = '(';

      Object.keys(dto.city).forEach(key => {
        const index = provinces.data.results
          .map(data => data.province_id)
          .indexOf(`${dto.city[key]}`);
        if (index < 0) {
          throw new BadRequestException('Invalid City');
        }
        cityArr.push({ city: dto.city[key] });
      });

      const createAddress = await this.addressRepository.create(cityArr);
      await this.addressRepository.save(createAddress);

      createAddress.forEach(addr => {
        query += "'" + addr.id + "',";
      });
      query = query.slice(0, -1) + ')';

      const findAddress = await manager.query(
        `SELECT * FROM ${this.addressRepository.metadata.tableName} WHERE id in ${query} `,
      );
      const data = this.userRepository.create({
        roleId: RoleId.CONTRIBUTOR,
        email: dto.email,
        active: false,
        password: 'default',
        profile: {
          phone: dto.phone,
          pageURL: dto.website,
          name: dto.name,
          city: provinces.data.results.find((s) => s.province_id == dto.city[0])?.province_name
        },
        address: findAddress,
      });
      console.log('Toi save');
      await this.userRepository.save(data);
      const { email, id, role, roleId, profile, createdat, updatedat } = data;
      return { email, id, role, roleId, profile, createdat, updatedat };
    } catch (error) {
      if (error.status == 400) {
        throw error;
      }
      if (error.code == '23505') {
        throw new HttpException(
          {
            message: 'Email Already exists',
            code: HttpStatus.CONFLICT,
          },
          HttpStatus.CONFLICT,
        );
      }
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  async validateUser(payload: LoginDTO): Promise<User> {
    let userByEmail = null;

    try {
      userByEmail = await this.userRepository.findOne({
        where: { email: payload.email },
      });
    } catch (error) {
      throw new HttpException(
        {
          message: 'Internal Server Error',
          status: HttpStatus.INTERNAL_SERVER_ERROR,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    if (
      !userByEmail ||
      !(await this.comparePassword(payload.password, userByEmail.password))
    ) {
      throw new HttpException(
        {
          message: 'Invalid Credentials',
          status: HttpStatus.UNAUTHORIZED,
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    return userByEmail;
  }
  async comparePassword(attempt: string, password: string): Promise<boolean> {
    return await bcrypt.compare(attempt, password);
  }

  async changePwd(user: any, body: ChangePwdDTO) {
    const checkUser = await this.userRepository.findOne({
      where: { id: user.users.id },
    });
    if (!checkUser) {
      return new NotFoundException('User not found');
    } else if (!bcrypt.compareSync(body.oldPassword, checkUser.password)) {
      return new BadRequestException('Password incorrect');
    }
    await this.userRepository.update(
      { id: user.users.id },
      { password: await bcrypt.hash(body.password, 12) },
    );
    return { status: true };
  }

  async uploadAvatar(userId: string, dto: UploadAvatar) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['profile'],
      });
      await this.profileRepository.update(
        { id: user.profile.id },
        { profileUrl: dto.profileUrl },
      );
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  async updatePhoneNumber(dto: UpdatePhoneNumber, userId: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { id: userId },
        relations: ['profile'],
      });
      await this.profileRepository.update(
        { id: user.profile.id },
        { phone: dto.phone },
      );
      return { success: true };
    } catch (err) {
      throw new InternalServerErrorException('Server Error');
    }
  }

  async getRecently(id: string) {
    try {
      const manager = getManager();
      // console.log(id)
      const jobRecently = await manager.query(
        `SELECT "jobId" FROM ${this.job_recently} WHERE "userId"='${id}'`,
      );
      // console.log(jobRecently)
      const jobId = jobRecently.map(job => {
        return job.jobId;
      });
      // console.log('job 1', this.jobRepository.findOne({ }))
      const jobs = await this.jobRepository.findByIds(jobId, {
        where: {},
        relations: ['user', 'user.profile', 'categories', 'address'],
      });
      // console.log('jobs', jobs)
      return jobs.map(job => {
        delete job.user.password;
        return job;
      });
    } catch (err) {
      console.log(err)
      throw new InternalServerErrorException('Server Error');
    }
  }
}
