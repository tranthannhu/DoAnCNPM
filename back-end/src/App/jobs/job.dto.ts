import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class JobDTO {
  @ApiProperty({ example: '6cdd23ae-bc72-4cb0-98d4-7f6209fea928' })
  userId: string;
}
