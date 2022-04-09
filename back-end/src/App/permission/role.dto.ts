import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { PerPosDTO } from './perpos.dto';

export class RoleDTO {
  @ApiProperty({ example: 1 })
  @IsString({ always: true })
  role: string;

  @ApiProperty({ example: [{permissionId: 1, possession: 'OWN'}] })
  @IsArray({ always: true })
  permissionPosession: Array<PerPosDTO>;
}
