import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  TreeChildren,
  TreeParent,
  ManyToMany,
  JoinTable,
  Tree,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { TreeBase } from './tree.entity';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Job } from './job.entity';

const { CREATE, UPDATE } = CrudValidationGroups;
@Entity('categories')
@Tree('materialized-path')
export class Category extends TreeBase {
  @PrimaryGeneratedColumn()
  id: number;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @ApiProperty({
    type: String,
    description: 'Category Name',
    required: true,
    example: 'fiction',
  })
  @IsString({ always: true })
  @Column()
  name: string;

  @IsOptional({ groups: [CREATE, UPDATE] })
  @IsOptional()
  @Column()
  slug: string;

  @TreeChildren()
  children: Category[];

  @TreeParent()
  parent: Category;

  @ManyToOne(
    type => User,
    user => user.categories,
  )
  user: User;

  /**
   * The relationship between Job and Category
   */
  @ManyToMany(
    type => Job,
    job => job.categories,
    { cascade: true },
  )
  jobs: Job[];

}
