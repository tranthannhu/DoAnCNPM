import { IsInt } from "class-validator"
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Base } from "./base.entity"

@Entity('user_rating')
export class UserRating extends Base {
@PrimaryGeneratedColumn('uuid')
id: string

@IsInt()
@Column({type: 'int'})
rating: number;

@Column({type: 'uuid'})
userId: string;

@Column({type: 'uuid'})
jobId: string;
}