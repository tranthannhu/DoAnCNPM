import {
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  BaseEntity,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export abstract class Base extends BaseEntity {
  @ApiProperty({ readOnly: true })
  @CreateDateColumn()
  public createdat: Date;

  @ApiProperty({ readOnly: true })
  @UpdateDateColumn({ nullable: true })
  public updatedat?: Date;

  @ApiProperty({ readOnly: true })
  @DeleteDateColumn({ nullable: true })
  public deletedat?: Date;
}
