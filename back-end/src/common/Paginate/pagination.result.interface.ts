export interface PaginationResultInterface<PaginationEnterty> {
  results: PaginationEnterty[];
  total: number;
  limit: number;
  next?: string;
  previous?: string;
}
