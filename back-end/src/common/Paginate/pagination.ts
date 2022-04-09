import { PaginationResultInterface } from './pagination.result.interface';

export class Pagination<PaginationEntity> {
  public data: PaginationEntity[];
  public totalPage: number;
  public total: number;
  public limit: number;

  constructor(paginationResults: PaginationResultInterface<PaginationEntity>) {
    this.data = paginationResults.results;
    this.totalPage = Math.ceil(paginationResults.results.length / paginationResults.limit);
    this.total = paginationResults.total;
    // this.limit = limit;
  }
}
