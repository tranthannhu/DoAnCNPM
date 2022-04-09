import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { PermissionsEntity } from './permission.entity';
@Entity('modules')
export class ModulesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'NOTIFICATION' })
  @Column()
  module: string;

  @OneToMany(
    type => PermissionsEntity,
    permission => permission.module,
  )
  permissions: PermissionsEntity[];
}
