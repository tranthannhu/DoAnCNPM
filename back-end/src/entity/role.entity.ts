import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Base } from './base.entity';
import { User } from './user.entity';
import { PermissionsEntity } from './permission.entity';
import { RolePermission } from './role_permission.entity';
@Entity('roles')
export class Role extends Base {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  role: string;
  @OneToMany(
    type => User,
    user => user.role,
  )
  users: User[];

  @OneToMany(
    type => RolePermission,
    rolePermission => rolePermission.role,
  )
  rolePermission: RolePermission[];
}
