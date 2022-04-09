import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany} from "typeorm";
import { JobToCv } from "./jobtocv.entity";
import {Profile} from "./profile.entity"

@Entity()
export class CV {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({type: 'nvarchar', length: 'MAX'})
    cvURL: string;

    @ManyToOne(() => Profile, profile => profile.cvs)
    profile: Profile;

    @OneToMany(() => JobToCv, jobToCv => jobToCv.cv)
    public jobToCvs!: JobToCv[];
}