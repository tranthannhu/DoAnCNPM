import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PerPosDTO {
  @ApiProperty({ example: 1 })
  @IsInt({ always: true })
  permissionId: number;

  @ApiProperty({ example: 'OWN' })
  @IsString({ always: true })
  posession: string;
}
