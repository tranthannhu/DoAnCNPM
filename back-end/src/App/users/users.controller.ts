import {
  Controller,
  HttpStatus,
  HttpException,
  Param,
  InternalServerErrorException,
  Get,
  Put,
  Request,
  UsePipes,
  NotFoundException,
  SetMetadata,
  BadRequestException,
  Post,
  Body,
} from '@nestjs/common';
import {
  CrudRequest,
  CreateManyDto,
  Crud,
  Override,
  ParsedRequest,
  ParsedBody,
} from '@nestjsx/crud';
import generatePassword = require('password-generator');
import { User } from '../../entity/user.entity';
import { UserService } from './users.service';
import { UserRepository } from './user.repository';
import { BaseController } from 'src/common/Base/base.controller';
import { Not, IsNull, Repository } from 'typeorm';
import { Modules } from 'src/common/decorators/module.decorator';
import { Methods } from 'src/common/decorators/method.decorator';
import { ValidationPipe } from 'src/shared/validation.pipe';
import {
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { methodEnum } from 'src/common/enums/method.enum';
import { ModuleEnum } from 'src/common/enums/module.enum';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { UserDTO } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from 'src/entity/profile.entity';
import RoleId from 'src/types/RoleId';
import { EmployersDTO, RegisterDTO } from '../auth/auth.dto';
import { AuthServices } from '../auth/auth.service';

@Crud({
  model: {
    type: User,
  },
  params: {
    id: {
      field: 'id',
      type: 'uuid',
      primary: true,
    },
  },
  query: {
    filter: [],
    exclude: ['password'],
    join: {
      role: {
        eager: true,
        allow: ['role'],
      },
      'role.permissions': {
        alias: 'pr',
      },
      profile: {
        exclude: ['updatedAt'],
        eager: true,
      },
    },
  },
})
@ApiTags('v1/users')
@Controller('/api/v1/users')
@Modules(ModuleEnum.USER)
@SetMetadata('entity', ['users'])
export class UserController extends BaseController<User> {
  constructor(
    private authService: AuthServices,
    public service: UserService,
    private readonly repository: UserRepository,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {
    super(repository);
  }
  private maxLength = 12;
  private minLength = 8;
  // get base(): CrudController<User> {
  //   return this;
  // }
  @Override('getManyBase')
  @Methods(methodEnum.READ)
  async getAll(@ParsedRequest() req: CrudRequest) {
    return await this.base.getManyBase(req);
  }

  @Override('deleteOneBase')
  @Methods(methodEnum.DELETE)
  async softDelete(@ParsedRequest() req: CrudRequest) {
    const id = req.parsed.paramsFilter.find(
      f => f.field === 'id' && f.operator === '$eq',
    ).value;

    const data = this.repository.findOne({ where: { id } });
    if (!data) {
      throw new NotFoundException('User not found');
    }
    try {
      await this.repository.softDelete({ id });
      return { status: true };
    } catch (error) {
      throw new InternalServerErrorException('Incomplete CrudRequest', error);
    }
  }

  @Put('restore/:id')
  @Methods(methodEnum.UPDATE)
  async restore(@Param('id') id: string) {
    const data = await this.repository.findOne({
      withDeleted: true,
      where: { id, deletedat: Not(IsNull()) },
    });
    if (!data) {
      throw new NotFoundException('User not Found');
    }
    try {
      return this.repository.restore({ id });
    } catch (error) {
      console.log('err', error);
      throw new InternalServerErrorException('Internal server error');
    }
  }
  @Override('createOneBase')
  @ApiOkResponse({ description: 'User login' })
  @ApiUnauthorizedResponse({ description: 'Invalid credential' })
  @UsePipes(new ValidationPipe())
  @Methods(methodEnum.CREATE)
  async createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: User) {
    try {
      const data = await this.base.createOneBase(req, dto);
      return data;
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException(
          {
            message: 'User or Email already exists',
            status: HttpStatus.CONFLICT,
          },
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          {
            message: 'Internal Server error',
            status: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  @Override('replaceOneBase')
  @Methods(methodEnum.UPDATE)
  @UsePipes(new ValidationPipe())
  async replaceOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UserDTO,
  ) {
    const id = req.parsed.paramsFilter.find(
      f => f.field === 'id' && f.operator === '$eq',
    ).value;

    const user = await this.repository.findOne({
      id,
    });
    if (!user) {
      throw new NotFoundException('User not Found');
    }

    if (user.roleId === RoleId.ADMIN && dto.roleId !== RoleId.ADMIN) {
      throw new BadRequestException('Role Admin can not be modified');
    }
    if (dto.roleId !== user.roleId) {
      await this.repository.update({ id }, { ExpiredToken: true });
    }
    try {
      await this.repository.update({ id }, { ...dto });
      return { status: true };
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  @Get('inActive/:id')
  @Methods(methodEnum.READ)
  async Inactive(@ParsedRequest() req: CrudRequest) {
    try {
      const deletedUser = await this.repository.find({
        withDeleted: true,
        where: { deletedat: Not(IsNull()) },
      });
      return deletedUser;
    } catch (error) {
      //console.log(error);
      console.log('error', error);
    }
  }

  @Override('updateOneBase')
  @Methods(methodEnum.UPDATE)
  @UsePipes(new ValidationPipe())
  async updateOne(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: UserDTO,
  ) {
    const id = req.parsed.paramsFilter.find(
      f => f.field === 'id' && f.operator === '$eq',
    ).value;
    const user = await this.repository.findOne({ id });

    const props: any = [];
    for (const [key, value] of Object.entries(user)) {
      props.push(key);
    }

    for (const [key, value] of Object.entries(dto)) {
      if (_.includes(props, key)) {
        user[`${key}`] = value;
      }
    }
    try {
      await this.repository.update({ id }, {});
      return { status: true };
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  /** Get All user Inactive status */
  @Get('inactive')
  @Methods(methodEnum.READ)
  async getInactive(@Request() req) {
    try {
      const results: any = await this.repository.paginate(
        {
          limit: req.query.hasOwnProperty('limit') ? req.query.limit : 10,
          page: req.query.hasOwnProperty('page') ? req.query.page : 1,
        },
        { relations: ['role', 'profile'] },
        { condition: { deletedat: Not(IsNull()) } },
      );
      return results;
    } catch (error) {
      throw new InternalServerErrorException('Error: Internal Server');
    }
  }

  private isStrongEnough(password: string) {
    const UPPER_RE = /([A-Z])/g;
    const LOWER_RE = /([a-z])/g;
    const NUMBER_RE = /([\d])/;
    const uc = password.match(UPPER_RE);
    const lc = password.match(LOWER_RE);
    const nc = password.match(NUMBER_RE);
    const uppercaseMinCount = 3;
    const lowercaseMinCount = 3;
    const numberMinCount = 2;

    return (
      password.length >= this.minLength &&
      password.length <= this.maxLength &&
      uc &&
      lc &&
      nc &&
      uc.length >= uppercaseMinCount &&
      lc.length >= lowercaseMinCount &&
      nc.length >= numberMinCount
    );
  }
  // Generate random password Function
  private customerPassword() {
    let password = '';
    const randomLength = Math.floor(
      Math.random() * (this.maxLength - this.minLength) + this.minLength,
    );
    while (!this.isStrongEnough(password)) {
      password = generatePassword(randomLength, false, /[\d\w]/);
    }
    // return password;
    return 'admin';
  }
  @Get('unauthorized')
  @Methods(methodEnum.READ)
  async getUnAuthorized(@Request() req) {
    try {
      const results: any = await this.repository.paginate(
        {
          limit: req.query.hasOwnProperty('limit') ? req.query.limit : 10,
          page: req.query.hasOwnProperty('page') ? req.query.page : 1,
        },
        { relations: ['role', 'profile'] },
        { condition: { active: false } },
      );

      results.data.map(data => {
        return {
          createdat: data.createdat,
        };
      });
      for (let index = 0; index < results.data.length; index++) {
        delete results.data[index].password;
        delete results.data[index].ExpiredToken;
        delete results.data[index].role;
      }
      return results;
    } catch (error) {
      throw new InternalServerErrorException('Error: Internal Server');
    }
  }

  @Put('identify/:id')
  @Methods(methodEnum.UPDATE)
  async authorizedUser(
    @ParsedRequest() req: CrudRequest,
    @Param('id') userId: string,
  ) {
    const user = await this.repository.findOne({
      where: { id: userId, roleId: RoleId.CONTRIBUTOR },
    });
    if (user && !user.active) {
      const generatePassword = this.customerPassword();
      user.password = await bcrypt.hash(generatePassword, 12);
      user.active = true;
      this.repository.save(user);
      // create reusable transporter object using the default SMTP transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'vietdanh.kiemtien.01@gmail.com', // generated ethereal user
          pass: 'kiemtien01', // generated ethereal password
        },
      });

      // send mail with defined transport object
      const mailOptions = {
        from: '"CareerNetwork" <vietdanh.kiemtien.01@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: 'Thank you for joining the App CareerNetwork!', // Subject line
        text: 'I am so glad you registered for the CareerNetwork', // plain text body
        html: `<b>Here's your password for login as employee</b><p>Make sure you don't share this email public</p><b>password: ${generatePassword}</b><p>Our best</p><b>Twist Team</b>`, // html body
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      return { status: true };
    } else {
      throw new NotFoundException('User not Found');
    }
  }
  @Override('createManyBase')
  async createMany(
    @ParsedRequest() req: CrudRequest,
    @ParsedBody() dto: CreateManyDto<User>,
  ) {
    try {
      return await this.base.createManyBase(req, dto);
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new HttpException(
          {
            message: 'User or Email already exists',
            status: HttpStatus.CONFLICT,
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        throw new HttpException(
          {
            message: 'Internal Server error',
            status: HttpStatus.BAD_REQUEST,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
  @Override('getOneBase')
  @Methods(methodEnum.READ)
  async getOne(@ParsedRequest() req: CrudRequest, @ParsedRequest() dto: User) {
    try {
      const data = await this.base.getOneBase(req);
      return data;
    } catch (error) {
      throw new HttpException(
        {
          message: 'User not found',
          error: HttpStatus.NOT_FOUND,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id/profile')
  @Methods(methodEnum.UPDATE)
  async getUserProfile(@Param('id') id: string)
  {
    try {
      const user:any = await this.repository.find({
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
      await this.profileRepository.update(
        { id: user.profile.id },
        { view: user.profile.view++ },
      );
      console.log('here');

      // const findProfile = await this.profileRepository.findOne({
      //   join: { alias: 'profile', innerJoin: { user: 'profile.user' } },
      //   where: qb => {
      //     qb.where('user.id = :id', { id: id });
      //   }
      // });
      // await this.profileRepository.update({ id: user.profile.id }, { view: findProfile.view++});
      // console.log(findProfile);
      
      if (!user) {
        throw new HttpException(
          {
            message: 'User not found',
            error: HttpStatus.NOT_FOUND,
          },
          HttpStatus.NOT_FOUND,
        );
      }
      // const userProfile = this.profileRepository.find({
      //   where: { user.id: id }
      // })

      // console.log(userProfile);

      return user;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          message: 'Internal Server error',
          status: HttpStatus.BAD_REQUEST,
        },
        HttpStatus.BAD_REQUEST,
      );
      
    }
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  async Register(@Body() data: RegisterDTO) {
    return this.authService.register(data);
  }

  @Post('registerContributor')
  @UsePipes(new ValidationPipe())
  async addLead(@Body() data: EmployersDTO) {
    return this.authService.addLead(data);
  }
  
}
