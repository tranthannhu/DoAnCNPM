import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateManyDto, CrudRequest, GetManyDefaultResponse } from '@nestjsx/crud';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { DeepPartial, DeleteResult, UpdateResult } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { TagDto } from './dto/tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';
import { TagRepository } from './tags.repository';

@Injectable()
export class TagsService extends TypeOrmCrudService<Tag> {
  /**
   *
   */
  constructor(public readonly repo : TagRepository) {
    super(repo);
  }

  async getOneBase(req: CrudRequest) : Promise<TagDto> {
    return await this.getOne(req);
  }

  async getManyBase(req: CrudRequest) : Promise<GetManyDefaultResponse<TagDto> | TagDto[]> {
    return await this.getMany(req);
  }
  async createOneBase(req: CrudRequest, dto: CreateTagDto): Promise<TagDto> {
    return await this.createOne(req, dto);
  }

  async createManyBase(req: CrudRequest, dto: CreateManyDto<DeepPartial<CreateTagDto>>): Promise<TagDto[]> {
    return await this.createMany(req, dto);
  }

  async updateOneBase(req: CrudRequest, dto: DeepPartial<UpdateTagDto>) : Promise<TagDto> {
    return await this.updateOne(req, dto);
  }

  async replaceOneBase(req: CrudRequest, dto: DeepPartial<UpdateTagDto>) : Promise<TagDto> {
    return await this.replaceOne(req, dto);
  }

  async softDelete(id: string) :  Promise<UpdateResult> {
    return await this.repo.softDelete({id});
  }
  
  async deleteOneBase(id: string) : Promise<DeleteResult> {
    return await this.repo.delete({id});
  }

  async restoreBase(id: string) : Promise<UpdateResult> {
    return await this.repo.restore({id});
  }
}
