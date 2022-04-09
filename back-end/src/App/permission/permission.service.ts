import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RolePermissionRepository } from './rolePermission.repository';
import { Role } from 'src/entity/role.entity';
import { Repository } from 'typeorm';
import * as _ from 'lodash';
import { PermissionsEntity } from 'src/entity/permission.entity';
import { RolePermission } from 'src/entity/role_permission.entity';
import { PermissionDTO } from './permission.dto';
import { UserRepository } from '../users/user.repository';
import { ModulesEntity } from 'src/entity/module.entity';
import RoleId from 'src/types/RoleId';

@Injectable()
export class PermissionService {
  constructor(
    private repository: RolePermissionRepository,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectRepository(PermissionsEntity)
    private readonly permissionRepository: Repository<PermissionsEntity>,
    @InjectRepository(ModulesEntity)
    private readonly moduleRepository: Repository<ModulesEntity>,
    private readonly userRepository: UserRepository,
  ) {}
  async getRolesPermission(roleId: number) {
    try {
      const permissionRole = [];
      const rolePermissions = await this.roleRepository.findOne({
        where: { id: roleId },
        relations: [
          'rolePermission',
          'rolePermission.permission',
          'rolePermission.permission.method',
          'rolePermission.permission.module',
        ],
      });
      rolePermissions.rolePermission.forEach(permission => {
        const rolePermission = `${_.toUpper(rolePermissions.role)}_${_.toUpper(
          permission.permission.method.method,
        )}_${_.toUpper(permission.posession)}_${_.toUpper(
          permission.permission.module.module,
        )}`;
        permissionRole.push({
          module: permission.permission.module.module,
          scope: rolePermission,
          id: permission.permissionId,
          posession: permission.posession,
          action: `${permission.permission.method.method} ${permission.permission.module.module}`,
        });
      });
      return permissionRole;
    } catch (error) {
      throw new InternalServerErrorException('Interal Server Error');
    }
  }

  async getAllPermission() {
    try {
      const permissionRole = [];

      const permissions = await this.permissionRepository.find({
        relations: ['method', 'module'],
      });

      permissions.forEach(permission => {
        const scope = `${_.toUpper(permission.method.method)} ${_.toUpper(
          permission.module.module,
        )}`;
        permissionRole.push({
          module: permission.module.module,
          id: permission.id,
          action: scope,
        });
      });
      return permissionRole;
    } catch (error) {
      throw new InternalServerErrorException('Inerternal Server Error');
    }
  }

  async getOne(id: number) {
    try {
      return await this.permissionRepository.findOne({ id });
    } catch (error) {
      throw new InternalServerErrorException('Interal Server Error Exception');
    }
  }

  async findPermission(moduleId: number, methodId: number) {
    try {
      const permission = this.permissionRepository.findOne({
        where: { moduleId: moduleId, methodId: methodId },
      });

      return permission ? true : false;
    } catch (error) {
      throw new InternalServerErrorException('Interal Server Error Exception');
    }
  }

  async createPermission(data: PermissionsEntity) {
    try {
      const permission = await this.permissionRepository.findOne({
        where: { moduleId: data.moduleId, methodId: data.methodId },
      });
      if (permission) {
        return new BadRequestException('Permission already exists');
      }
      const newPermission = await this.permissionRepository.create({
        ...data,
      });
      await this.permissionRepository.save(newPermission);
    } catch (error) {
      throw new InternalServerErrorException('Interal Server Error Exception');
    }
  }

  async saveRolePermission(
    rolePermission: RolePermission,
    data: PermissionDTO,
    id: number,
  ) {
    try {
      const Object = rolePermission;
      Object.roleId = data.roleId;
      Object.posession = data.possession;
      Object.permissionId = id;

      const getUserByRole = await this.userRepository.find({
        where: { roleId: data.roleId },
      });

      //Set User by defined role has expiredToken
      Promise.all(
        getUserByRole.map(async user => {
          user.ExpiredToken = true;
          return await this.userRepository.save(user);
        }),
      );
      return await this.repository.save(Object);
    } catch (error) {
      throw new InternalServerErrorException('Interal Server Error Exception');
    }
  }

  async createModule(dto: ModulesEntity) {
    try {
      const newModule = this.moduleRepository.create({
        ...dto,
      });
      const module = await this.moduleRepository.save(newModule);
      console.log('here');
      for (let i = 1; i <= 4; i++) {
        const newPermission = await this.permissionRepository.create({
          moduleId: module.id,
          methodId: i,
        });
        const permission = await this.permissionRepository.save(newPermission);

        const newRolePermission = await this.repository.create({
          roleId: RoleId.ADMIN,
          permissionId: newPermission.id,
          posession: 'ANY',
        });
        await this.repository.save(newRolePermission);
      }

      return module;
    } catch (error) {
      throw new InternalServerErrorException('Interal Server Error Exception');
    }
  }
}
