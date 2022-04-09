import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    Index,
  } from 'typeorm';
import { CrudValidationGroups } from '@nestjsx/crud';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { Base } from 'src/entity/base.entity';
import { Job } from 'src/entity/job.entity';
import { classToPlain, Exclude, Expose } from 'class-transformer';
import { property } from 'lodash';
import { ApiProperty } from '@nestjs/swagger';
  const { CREATE, UPDATE } = CrudValidationGroups;
  @Entity('tags')
  export class Tag extends Base {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @IsOptional({ groups: [UPDATE] })
    @IsNotEmpty({ groups: [CREATE] })
    @Column({ type: 'nvarchar' })
    @Index({unique: true})
    name: string;
  
    // @ManyToOne(
    //   type => User,
    //   user => user.tags,
    // )
    // author: User;
    toJSON() {
      return classToPlain(this);
    }

    @Exclude({ toPlainOnly: true })
    @ManyToMany(
      () => Job,
      job => job.tags,
    )
    jobs: Job[];
  }