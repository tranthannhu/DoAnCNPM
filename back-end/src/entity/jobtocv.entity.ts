import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Base } from "./base.entity";
import { CV } from "./cv.entity";
import { Job } from "./job.entity";

@Entity()
export class JobToCv extends Base {
    @PrimaryGeneratedColumn()
    public jobToCvId!: number;

    @Column()
    public jobId!: string;

    @Column()
    public cvId!: number;

    @Column({default: false})
    public status!: boolean;

    @Column({default: false})
    public isDenied: boolean;

    @ManyToOne(() => Job, job => job.jobToCvs)
    public job!: Job;

    @ManyToOne(() => CV, cv => cv.jobToCvs)
    public cv!: CV;
}