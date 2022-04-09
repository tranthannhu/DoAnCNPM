import { Controller, Delete, Param, Patch, Post, Put, SetMetadata } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateManyDto, Crud, CrudController, CrudRequest, CrudService, GetManyDefaultResponse, Override, ParsedBody, ParsedRequest } from '@nestjsx/crud';
import { Methods } from 'src/common/decorators/method.decorator';
import { Modules } from 'src/common/decorators/module.decorator';
import { methodEnum } from 'src/common/enums/method.enum';
import { ModuleEnum } from 'src/common/enums/module.enum';
import { DeepPartial, DeleteResult, UpdateResult } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagDto } from './dto/tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { TagsService } from './tags.service';


@Crud({
  model: {
    type: Tag
  },
  params: {
    id: {
      field: 'id',
      type: 'string',
      primary: true,
    },
  },
  serialize: {
    create: TagDto,
    get: TagDto,
    getMany: TagDto
  },
  dto: {
    create: CreateTagDto,
    update: UpdateTagDto,
    replace: UpdateTagDto,
  },
  query: {
    filter: [],
    join: {
      
    },
  },
})
@ApiTags('v1/tags')
@Modules(ModuleEnum.TAG)
@SetMetadata('entity', ['tags'])
@Controller('/api/v1/tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {
  }
  service: CrudService<Tag>;

  getManyBase?(req: CrudRequest): Promise<GetManyDefaultResponse<Tag> | Tag[]> {
    throw new Error('Method not implemented.');
  }
  
  @Methods(methodEnum.READ)
  @Override('getOneBase')
  async getOne(@ParsedRequest() req: CrudRequest) : Promise<TagDto> {
    return await this.tagsService.getOneBase(req);
  }

  @Methods(methodEnum.READ)
  @Override('getManyBase')
  async getMany(@ParsedRequest() req: CrudRequest) : Promise<GetManyDefaultResponse<TagDto> | TagDto[]> {
      return await this.tagsService.getManyBase(req);
  }

  @Methods(methodEnum.CREATE)
  @Override('createOneBase')
  async createOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: CreateTagDto): Promise<TagDto> {
    return await this.tagsService.createOneBase(req, dto);
  }

  @Methods(methodEnum.CREATE)
  @Override('createManyBase')
  async createMany(@ParsedRequest() req: CrudRequest, @ParsedBody() dto:  CreateManyDto<DeepPartial<CreateTagDto>>): Promise<TagDto[]> {
    return await this.tagsService.createManyBase(req, dto);
  }

  @Methods(methodEnum.UPDATE)
  @Override('updateOneBase')
  async updateOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto:  UpdateTagDto): Promise<TagDto> {
    return await this.tagsService.updateOneBase(req, dto);
  }

  @Methods(methodEnum.UPDATE)
  @Override('replaceOneBase')
  async replaceOne(@ParsedRequest() req: CrudRequest, @ParsedBody() dto: DeepPartial<UpdateTagDto>): Promise<TagDto> {
    return await this.tagsService.replaceOneBase(req, dto);
  }

  @Methods(methodEnum.DELETE)
  @Override('deleteOneBase')
  async deleteOne(@ParsedRequest() req): Promise<UpdateResult> {
    const id = req.parsed.paramsFilter.find(
      f => f.field === 'id' && f.operator === '$eq',
    ).value;
    return await this.tagsService.softDelete(id);
  }

  @Methods(methodEnum.DELETE)
  @Delete('/delete/:id')
  async forceDelete(
    @Param('id') id: string,
  ): Promise<DeleteResult> {
    return await this.tagsService.deleteOneBase(id);
  }

  @Methods(methodEnum.UPDATE)
  @Patch('/restore/:id')
  async restore( @Param('id') id: string): Promise<UpdateResult> {
    return await this.tagsService.restoreBase(id);
  }

}
