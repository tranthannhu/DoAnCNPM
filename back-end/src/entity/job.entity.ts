import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Base } from './base.entity';
import {
  IsOptional,
  IsString,
  IsNotEmpty,
  IsDecimal,
  IsIn,
  IsBoolean,
  IsInt,
} from 'class-validator';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { JobType } from '../common/enums/jobTypes.enum';
import { enumToArray } from '../core/utils/helper';
import { Category } from './category.entity';
import { Address } from './address.entity';
import { Exclude } from 'class-transformer';
import { AppliedJob } from './applied_job.entity';
import { JobToCv } from './jobtocv.entity';
import { JobRecently } from './job_recently.entity';
import { JobFavorite } from './job_favorite.entity';
import { Tag } from 'src/App/tags/entities/tag.entity';

const { CREATE, UPDATE } = CrudValidationGroups;
@Entity('jobs')
export class Job extends Base {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'Lap trinh Android, IOS' })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsString({ always: true })
  @Column()
  name: string;

  // @ApiProperty({ example: 'string' })
  // @IsOptional({ groups: [UPDATE] })
  // @IsNotEmpty({ groups: [CREATE] })
  // @IsString({ always: true })
  // @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
  // content: string;

  @ApiProperty({ example: 1000 })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @IsDecimal()
  @Column({ type: 'decimal', nullable: true })
  lowestWage: number;

  @ApiProperty({ example: 1500 })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @IsDecimal()
  @Column({ type: 'decimal', nullable: true })
  highestWage: number;

  @ApiProperty({ example: 'string' })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @IsString({ always: true })
  @Column({ type: 'nvarchar', length: 'MAX', nullable: true })
  description: string;

  @ApiProperty({ example: 'FULLTIME | PARTTIME' })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @IsIn(enumToArray(JobType))
  @Column({ nullable: true })
  type: string;

  @ApiProperty({ example: 1 })
  @IsOptional({ groups: [UPDATE, CREATE] })
  @Column({ type: 'int', nullable: true })
  experience: number;

  @ApiProperty({ example: 'YYYY-MM-DD' })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ type: 'date' })
  deadline: Date;

  @ApiProperty({
    example:
      'https://eatsleepworkrepeat.com/wp-content/uploads/2020/06/office.jpg',
  })
  @IsOptional({ groups: [CREATE, UPDATE] })
  @IsString({ always: true })
  @Column({ nullable: true })
  introImg: string;

  @IsOptional({ groups: [UPDATE, CREATE] })
  @Exclude()
  @IsBoolean()
  @Column({ default: false })
  status: boolean;

  /**
   * Relation between User and Job
   */
  @ManyToOne(
    type => User,
    user => user,
  )
  user: User;

  /**
   * The relationship between Job and Category
   */
  @ManyToMany(
    type => Category,
    category => category.jobs,
  )
  @JoinTable({
    name: 'Job_Cate',
    joinColumn: {
      name: 'jobId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'cateId',
      referencedColumnName: 'id',
    },
  })
  categories: Category[];

  /**
   * The relationship between Job and address
   */
  @ManyToOne(
    type => Address,
    address => address.jobs,
  )
  address: Address;

  /**
   * Favorites Job
   */
  @OneToMany(
    type => AppliedJob,
    appliedJob => appliedJob.job,
  )
  appliedBy: AppliedJob[];

  /**
   * Recently Job
   */
  @OneToMany(type => JobRecently,
    j => j.job
  )
  recently: JobRecently[];

  @OneToMany(type => JobFavorite,
    j => j.job
  )
  favoriteBy: JobFavorite[];

  @OneToMany(() => JobToCv, jobToCv => jobToCv.job)
  public jobToCvs!: JobToCv[];

  /**
  * The relationship between User and Tag
  *
  */
  @ManyToMany(
    type => Tag,
    tag => tag.jobs,
    { cascade: true }
  )
  @JoinTable({
    joinColumn: {
      name: 'jobId',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'tagId',
      referencedColumnName: 'id',
    },
    name: 'job_tag'
  })
  tags: Tag[];
}
