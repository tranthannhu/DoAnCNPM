import { ApiProperty } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { IsNotEmpty } from "class-validator";
import { Base } from "src/common/Base/base.dto";

const { CREATE } = CrudValidationGroups;

export class TagDto extends Base {
    @ApiProperty({
        type: String,
        example: 'Java'
    })
    name: string;
}
