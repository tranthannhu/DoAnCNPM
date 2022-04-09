import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEnum, IsInt, IsISO8601, IsLatitude, IsLongitude, IsString, IsUrl } from "class-validator";
import { JobType } from "src/common/enums/jobTypes.enum";

export class CreateJobDTO {
  @ApiProperty({ example: 'Lap trinh Android, IOS' })
  @IsString()
  name: string;

  @ApiProperty({ example: 1000 })
  @IsInt()
  lowestWage: number;

  @ApiProperty({ example: 1500 })
  @IsInt()
  highestWage: number;

  @ApiProperty({ example: 'string html' })
  description: string;

  @ApiProperty({ example: 'FULLTIME | PARTTIME' })
  @IsEnum(JobType)
  type: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  experience: number;

  @ApiProperty({ example: 'YYYY-MM-DD' })
  @IsISO8601()
  deadline: Date;

  @ApiProperty({
    example:
      'https://eatsleepworkrepeat.com/wp-content/uploads/2020/06/office.jpg',
  })
  @IsUrl()
  introImg: string;

  @ApiProperty({ example: ["455FB471-7C3F-EC11-9EBA-D4258B0760D4", "465FB471-7C3F-EC11-9EBA-D4258B0760D4", "475FB471-7C3F-EC11-9EBA-D4258B0760D4"] })
  @IsArray()
  tagIds: string[];

  @ApiProperty({ example: 48 })
  @IsInt({ always: true })
  city: number;

  @ApiProperty({ example: '54 Nguyen Thi Minh Khai, TP Ho Chi Minh' })
  @IsString()
  fullAddress: string;

  @ApiProperty({ example: 108.151198 })
  @IsLongitude()
  longitude: number;

  @ApiProperty({ example: 16.074527 })
  @IsLatitude()
  latitude: number;

}
