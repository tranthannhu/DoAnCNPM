import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ):
    | import('rxjs').Observable<Response<T>>
    | Promise<import('rxjs').Observable<Response<T>>> {
    return next.handle().pipe(map(data => ({ data })));
  }
}
