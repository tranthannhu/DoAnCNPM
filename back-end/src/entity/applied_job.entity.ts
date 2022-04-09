import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Base } from './base.entity';
import { Job } from './job.entity';
import { User } from './user.entity';

@Entity('applied_job')
export class AppliedJob extends Base {
  @Column({ type: 'uuid' })
  jobId: string;

  @Column({ type: 'uuid' })
  userId: string;

  @PrimaryGeneratedColumn()
  index_name: number;

  @Column({default: false})
  status: boolean;

  @Column({default: false})
  public isDenied: boolean;

  @ManyToOne(
    type => Job,
    job => job.appliedBy,
  )
  @JoinColumn({ name: 'jobId' })
  job: Job;

  @ManyToOne(
    type => User,
    user => user.applied,
  )
  @JoinColumn({ name: 'userId' })
  user: User;
}
