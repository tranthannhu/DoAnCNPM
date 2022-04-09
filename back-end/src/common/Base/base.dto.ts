import { ApiProperty } from '@nestjs/swagger';
  
export abstract class Base {
    @ApiProperty({ type: 'uuid'})
    public id: string
    
    @ApiProperty({
        type: Date,
    })
    public createdat: Date;
  
    @ApiProperty({ type: Date })
    public updatedat?: Date;
  
    @ApiProperty({ type: Date })
    public deletedat?: Date;
  }
  