import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CrudValidationGroups } from '@nestjsx/crud';
const { CREATE, UPDATE } = CrudValidationGroups;

export class UserDTO {
  @ApiProperty({ example: '2' })
  @IsNotEmpty({ groups: [CREATE] })
  roleId: number;
}
