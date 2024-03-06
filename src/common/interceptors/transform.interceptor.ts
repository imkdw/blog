import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface ResponseType<T = unknown> {
  data: T;
  error?: {
    errorCode: string;
    timestamp: number;
  };
}

@Injectable()
export default class TransformInterceptor<T> implements NestInterceptor<T, ResponseType<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseType<T>> {
    return next.handle().pipe(
      map((data) => ({
        data,
      })),
    );
  }
}
