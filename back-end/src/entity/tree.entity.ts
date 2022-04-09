import { Base } from './base.entity';
import { IsInt, IsOptional } from 'class-validator';
import { Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export class TreeBase extends Base {
  @ApiProperty({ example: null })
  @IsOptional()
  @IsInt()
  @Column({ nullable: true })
  parentId: number;
}
