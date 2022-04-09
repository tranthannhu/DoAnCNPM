import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { MethodsEntity } from './method.entity';
import { ModulesEntity } from './module.entity';
import { Role } from './role.entity';
import { posessionEnum } from '../common/enums/possession.enum';
import { RolePermission } from './role_permission.entity';
@Entity('permissions')
export class PermissionsEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column('integer')
  methodId: number;
  @Column('integer')
  moduleId: number;
  @ManyToOne(
    type => MethodsEntity,
    method => method.permissions,
  )
  @JoinColumn({ name: 'methodId' })
  method: MethodsEntity;
  @ManyToOne(
    type => ModulesEntity,
    module => module.permissions,
  )
  @JoinColumn({ name: 'moduleId' })
  module: ModulesEntity;

  @OneToMany(
    type => RolePermission,
    rolePermission => rolePermission.permission,
  )
  rolePermission: RolePermission[];
}
