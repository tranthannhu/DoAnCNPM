import { take } from 'lodash';
import { Interface } from 'readline';
import { In, IsNull, Not, Repository } from 'typeorm';
import { Pagination, PaginationOption } from '../Paginate';

interface RelationType {
  relations: Array<string>;
}

// interface DeletedType {
//   deletedat: boolean;
// }

interface ConditionType {
  condition: Record<string, any>;
}
export class BaseRepository<T> extends Repository<T> {
  constructor() {
    super();
  }
  async paginate(
    options: PaginationOption,
    relations?: RelationType,
    condition?: ConditionType,
  ): Promise<Pagination<T>> {
    if (condition) {
      const [results, count] = await this.findAndCount({
        take: options.limit,
        skip: (options.page - 1) * options.limit,
        withDeleted: true,
        relations: [...relations.relations],
        where: condition.condition,
      });
      return new Pagination<T>({ results, total: count, limit: options.limit });
    }
  }
}
