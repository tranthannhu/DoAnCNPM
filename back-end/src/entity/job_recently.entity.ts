import { IsInt } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base.entity";
import { Job } from "./job.entity";
import { User } from "./user.entity";

@Entity('job_recently')
export class JobRecently extends Base {
@PrimaryGeneratedColumn('uuid')
id: string

@Column({type: 'uuid'})
userId: string;

@Column({type: 'uuid'})
jobId: string;

@IsInt()
@Column({type: 'int'})
count: number;

@ManyToOne(type => User,
    u => u.recently
)
@JoinColumn({name: 'userId'})
user!: User;

@ManyToOne(type => Job,
    j => j.recently
    )
@JoinColumn({name: 'jobId'})
job!: Job
}