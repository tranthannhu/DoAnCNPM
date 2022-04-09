import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  OneToMany,
} from 'typeorm';
import { PermissionsEntity } from './permission.entity';

@Entity('methods')
export class MethodsEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  method: string;
  @OneToMany(
    type => PermissionsEntity,
    permission => permission.method,
  )
  permissions: PermissionsEntity[];
}
