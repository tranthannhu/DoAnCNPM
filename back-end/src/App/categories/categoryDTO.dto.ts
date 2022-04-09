import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
const { CREATE, UPDATE } = CrudValidationGroups;

export class CateDTO {
  @ApiProperty({ example: 'fiction' })
  @IsNotEmpty({ groups: [CREATE] })
  name: string;
}
