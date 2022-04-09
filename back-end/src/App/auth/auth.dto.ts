import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength, IsOptional } from 'class-validator';
import { Match } from 'src/Helper/validation/match.decorator';
import { CrudValidationGroups } from '@nestjsx/crud';
const { CREATE } = CrudValidationGroups;
export class LoginDTO {
  @ApiProperty({
    type: String,
    description: 'username or email',
    required: true,
    example: 'admin@gmail.com',
  })
  @IsNotEmpty({ groups: [CREATE] })
  email: string;
  @IsString()
  @IsNotEmpty({ groups: [CREATE] })
  @ApiProperty({
    type: String,
    description: 'password',
    required: true,
    example: 'admin',
  })
  password: string;
}
export class RegisterDTO {
  @ApiProperty({
    example: 'admin@gmail.com',
    type: String,
    description: 'Email',
    required: true,
  })
  @IsNotEmpty({ groups: [CREATE] })
  email: string;

  @ApiProperty({
    example: 'admin',
    description: 'Password required at least 5 letters',
  })
  @MinLength(5, {
    always: true,
    message: 'Password requires at least 5 letters',
  })
  @IsString({ always: true })
  @IsNotEmpty({ groups: [CREATE] })
  @ApiProperty({ type: String, description: 'password', required: true })
  password: string;

  @IsString()
  @Match('password', { message: 'Password Does not Match' })
  @ApiProperty({
    type: String,
    description: 'Confirm password',
    required: true,
  })
  confirmPassword: string;

  @IsString()
  @ApiProperty({ type: String, description: 'Name' })
  name: string;
}

export class EmployersDTO {
  @ApiProperty({ example: 'Company Name' })
  @IsString({ always: true })
  name: string;

  @ApiProperty({ example: 'http://www.careernetwork.com' })
  @IsOptional({ groups: [CREATE] })
  @IsString({ always: true })
  website: string;

  @ApiProperty({ example: [32, 31] })
  city: Array<number>;

  @ApiProperty({ example: 'admin@gmail.com' })
  @IsString({ always: true })
  email: string;

  @ApiProperty({ example: '032248798' })
  @IsString({ always: true })
  phone: string;
}

export class ChangePwdDTO {
  @ApiProperty({
    example: '12345678',
  })
  @IsString()
  oldPassword: string;

  @ApiProperty({
    example: 'admin',
  })
  @IsString()
  password: string;

  @ApiProperty({ example: 'admin' })
  @IsString({ always: true })
  @Match('password', { message: 'Password does not match' })
  confirmPassword: string;
}

export class UploadAvatar {
  @ApiProperty({
    example: '/images/abc.jpg',
  })
  @IsString()
  profileUrl: string;
}

export class UpdatePhoneNumber {
  @ApiProperty({
    example: '01233456789',
  })
  @IsString()
  phone: string;
}

export class UpdateAddress {
  @ApiProperty({
    example: '01233456789',
  })
  city: number;

  @ApiProperty({
    example: '25 Le Do',
  })
  description: string;
}
