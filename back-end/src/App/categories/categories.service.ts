import { Injectable } from '@nestjs/common';
import { Category } from 'src/entity/category.entity';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryRepository } from './categories.repository';

@Injectable()
export class CategoryService extends TypeOrmCrudService<Category> {
    constructor(
        @InjectRepository(Category) repo,
        private readonly categoryRepository: CategoryRepository,
      ) {
        super(repo);
      }
}
