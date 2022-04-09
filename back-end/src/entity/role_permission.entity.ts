import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { IsInt } from 'class-validator';
import { Role } from './role.entity';
import { PermissionsEntity } from './permission.entity';
import { posessionEnum } from '../common/enums/possession.enum';
import { Base } from './base.entity';

@Unique('uniquekey', ['roleId', 'permissionId', 'posession'])
@Entity('role_permission')
export class RolePermission extends Base {
  @IsInt()
  @Column({ type: 'int' })
  roleId: number;

  @PrimaryGeneratedColumn()
  index_name: number;
  @IsInt()
  @Column({ type: 'int' })
  permissionId: number;

  @ManyToOne(
    type => Role,
    role => role.rolePermission,
  )
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @ManyToOne(
    type => PermissionsEntity,
    permission => permission.rolePermission,
  )
  @JoinColumn({ name: 'permissionId' })
  permission: PermissionsEntity;

  @Column({default: 'ANY' })
  posession: string;
}
