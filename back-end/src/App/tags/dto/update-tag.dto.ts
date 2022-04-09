import { PartialType } from '@nestjs/mapped-types';
import { CrudValidationGroups } from '@nestjsx/crud';
import { CreateTagDto } from './create-tag.dto';


const { UPDATE } = CrudValidationGroups;

export class UpdateTagDto extends PartialType(CreateTagDto) {
    
}
