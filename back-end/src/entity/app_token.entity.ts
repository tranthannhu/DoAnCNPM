import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('appToken')
export class AppToken {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  token: string;

  @ManyToOne(() => User, user => user.appTokens)
  user: User;
}