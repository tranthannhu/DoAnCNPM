import { IsInt } from "class-validator";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base.entity";
import { Job } from "./job.entity";
import { User } from "./user.entity";

@Entity('job_favorite')
export class JobFavorite extends Base {
@PrimaryGeneratedColumn('uuid')
id: string

@Column({type: 'uuid'})
userId: string;

@Column({type: 'uuid'})
jobId: string;

@ManyToOne(type => User,
    u => u.favorite
)
@JoinColumn({name: 'userId'})
user!: User;

@ManyToOne(type => Job,
    j => j.recently
    )
@JoinColumn({name: 'jobId'})
job!: Job
}