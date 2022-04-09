import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsInt, IsString } from 'class-validator';
import { posessionEnum } from 'src/common/enums/possession.enum';
import { enumToArray } from 'src/core/utils/helper';

export class PermissionDTO {
  @ApiProperty({ example: 1 })
  @IsInt({ always: true })
  roleId: number;

  @ApiProperty({ example: 'ANY' })
  @IsIn(enumToArray(posessionEnum))
  @IsString({ always: true })
  possession: string;
}
