import { EntityRepository, TreeRepository } from 'typeorm';
import { Category } from '../../entity/category.entity';

@EntityRepository(Category)
export class CategoryRepository extends TreeRepository<Category> {}
