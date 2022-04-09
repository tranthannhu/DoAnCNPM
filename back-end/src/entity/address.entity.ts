import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { Base } from './base.entity';
import { CrudValidationGroups } from '@nestjsx/crud';
const { CREATE, UPDATE } = CrudValidationGroups;
import { IsOptional, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Job } from './job.entity';
@Entity('addresses')
export class Address extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: '1' })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'int' })
  city: number;

  @ApiProperty({ example: ' ' })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @Column({type: 'nvarchar', length: 'MAX', nullable: true })
  description: string;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @Column({ type: 'float', nullable: true })
  latitude: number;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @Column({ type: 'float', nullable: true })
  longitude: number;

  /**
   * The relationship between Address and User
   */
  @ManyToMany(
    type => User,
    user => user.address,
  )
  user: User[];

  /**
   * The relationship between Address and Job
   */
  @OneToMany(
    type => Job,
    job => job.address,
    { cascade: true },
  )
  jobs: Job[];
}
