import { CrudController } from '@nestjsx/crud';
import { BaseRepository } from './base.repository';

export class BaseController<T> implements CrudController<T> {
  service: import('@nestjsx/crud').CrudService<T>;
  constructor(private readonly baseRepository: BaseRepository<T>) {}
  get base(): CrudController<T> {
    return this;
  }
}
