import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { PermissionService } from './permission.service';
import { ApiTags } from '@nestjs/swagger';
import {
  CrudRequest,
  Override,
  ParsedBody,
  ParsedRequest,
} from '@nestjsx/crud';
import { RolePermissionRepository } from './rolePermission.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/entity/role.entity';
import { RelationQueryBuilder, Repository } from 'typeorm';
import { Modules } from 'src/common/decorators/module.decorator';
import { ModuleEnum } from 'src/common/enums/module.enum';
import { Methods } from 'src/common/decorators/method.decorator';
import { methodEnum } from 'src/common/enums/method.enum';
import { PermissionDTO } from './permission.dto';
import { ValidationPipe } from 'src/shared/validation.pipe';
import { RolePermission } from 'src/entity/role_permission.entity';
import { get } from 'lodash';
import { PermissionsEntity } from 'src/entity/permission.entity';
import { ModulesEntity } from 'src/entity/module.entity';
import { RoleDTO } from './role.dto';
import { PerPosDTO } from './perpos.dto';
import RoleId from 'src/types/RoleId';

// @Crud({
//   model: {
//     type: PermissionsEntity,
//   },
// })
@Modules(ModuleEnum.PERMISSION)
@ApiTags('api/v1/permissions')
@Controller('/api/v1/permission')
export class PermissionController {
  constructor(
    private permissionService: PermissionService,
    private repository: RolePermissionRepository,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  @Methods(methodEnum.READ)
  @Get('/all')
  async getAllPermission(@ParsedRequest() req: CrudRequest) {
    return await this.permissionService.getAllPermission();
  }

  @Get(':roleId')
  @Methods(methodEnum.READ)
  async GetAllPermissionByRole(
    @ParsedRequest() req: CrudRequest,
    @Param('roleId') roleId: number,
  ) {
    try {
      const rolePermissions: any = await this.permissionService.getRolesPermission(
        roleId,
      );
      return rolePermissions;
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  @Put(':id')
  @Methods(methodEnum.UPDATE)
  @UsePipes(new ValidationPipe())
  async updatePermission(@Param('id') id: number, @Body() data: PerPosDTO[]) {
    if (id == 1) {
      throw new BadRequestException('Permission roleAdmin can not be Modified');
    }
    const role = await this.roleRepository.findOne({
      where: { id: id },
    });
    
    if (!role) {
      throw new NotFoundException('Role Not Found');
    }
    const permission = await this.permissionService.getOne(id);
    console.log('permission', permission);

    const findRolePermission = await this.repository.find({
      where: { roleId: id }
    })
    await this.repository.remove(findRolePermission);

    for (let i = 0; i < data.length; i++) {
      const newRolePermission = await this.repository.create({ 
        roleId: id,
        permissionId: data[i].permissionId,
        posession: data[i].posession,
      });
      await this.repository.save(newRolePermission);
    }
    return;
  }

  @Delete(':id')
  @Methods(methodEnum.DELETE)
  async deleteOne(@Param('id') id: number, @Body() data: PermissionDTO) {
    if (data.roleId === RoleId.ADMIN) {
      throw new BadRequestException('Permission roleAdmin can not be Modified');
    }

    const rolePermission = await this.repository.findOne({
      where: { permissionId: id, roleId: data.roleId },
    });
    if (!rolePermission) {
      throw new NotFoundException('Role Permission Not Found');
    }
    return await this.repository.delete(rolePermission);
  }

  @Get('role/all')
  @Methods(methodEnum.READ)
  async getAllrole() {
    return await this.roleRepository.find();
  }

  @Put(':permissionId/updatePosession')
  @Methods(methodEnum.UPDATE)
  async updatePosession(
    @Param('permissionId') permissionId: number,
    @Body() dto: PermissionDTO,
  ) {
    if (dto.roleId == RoleId.ADMIN) {
      throw new BadRequestException('Posession roleAdmin can not be Modified');
    }

    return this.repository.update(
      { roleId: dto.roleId, permissionId: permissionId },
      dto,
    );
  }

  @Post('role')
  @Methods(methodEnum.CREATE)
  async createRole(@Body() dto: RoleDTO) {
    try {
      const newRole = this.roleRepository.create({
        role: dto.role,
      });
      const role = await this.roleRepository.save(newRole);
      for (let i = 0; i < dto.permissionPosession.length; i++) {
        const newRolePermission = this.repository.create({
          roleId: role.id,
          permissionId: dto.permissionPosession[i].permissionId,
          posession: dto.permissionPosession[i].posession,
        });
        await this.repository.save(newRolePermission);
      }

      return role;
    } catch {
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  @Post()
  @Methods(methodEnum.CREATE)
  async createPermission(@Body() dto: PermissionsEntity) {
    return this.permissionService.createPermission(dto);
  }

  @Post('module')
  @Methods(methodEnum.CREATE)
  async createModule(@Body() dto: ModulesEntity) {
    return this.permissionService.createModule(dto);
  }
}
