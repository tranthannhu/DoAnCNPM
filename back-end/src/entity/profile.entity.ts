import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Base } from './base.entity';
import {
  IsOptional,
  IsString,
  MaxLength,
  IsPhoneNumber,
} from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { User } from './user.entity';
import { CV } from './cv.entity';
const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('profiles')
export class Profile extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsOptional({ groups: [UPDATE] })
  @IsString({ always: true })
  @Column({ nullable: false })
  name: string;

  @IsOptional({ groups: [CREATE, UPDATE] })
  @IsString({ always: true })
  @Column({type: 'nvarchar', length: 'MAX', nullable: true, default: 'https://cdn.iconscout.com/icon/free/png-256/profile-417-1163876.png' })
  profileUrl: string;

  @IsOptional({ groups: [CREATE, UPDATE] })
  @IsString({ always: true })
  @Column({type: 'nvarchar', length: 'MAX', nullable: true, default: 'http://dut.udn.vn/' })
  pageURL: string;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @IsString({ always: true })
  @MaxLength(255, { always: true })
  @Column({ type: 'nvarchar', length: 'MAX', nullable: true, default: 'Hello fen :XD' })
  introduction: string;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @IsPhoneNumber('VN US')
  @Column({ type: 'varchar', length: 255, nullable: true, default: '0123456789' })
  phone: string;

  @Column({ type: 'decimal', nullable: true })
  salaryRange: number;

  @Column({ type: 'integer', default: 0 })
  view: number;

  @Column({ nullable: true, default: 'Đà Nẵng' })
  city: string;

  /** Relation to User */

  @OneToOne(
    type => User,
    user => user.profile,
  )
  user: User;


  @OneToMany(() => CV, cv => cv.profile)
  cvs: CV[];
}
