import { ApiProperty } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { IsNotEmpty, IsString } from "class-validator";
import { Base } from "src/common/Base/base.dto";

const { CREATE } = CrudValidationGroups;

export class CreateTagDto {
    @ApiProperty({
        type: String,
        required: true,
        example: 'Java'
    })
    @IsString({ always: true })
    @IsNotEmpty({groups: [CREATE]})
    name: string;
}
