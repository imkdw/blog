import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface ResponseType<T = unknown> {
  data?: T;
  error?: unknown;
}

@Injectable()
export default class TransformInterceptor<T> implements NestInterceptor<T, ResponseType<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseType<T>> {
    return next.handle().pipe(
      map((data) => ({
        data,
      })),
      catchError((err) =>
        of({
          error: err.response?.message || 'Internal server error',
        }),
      ),
    );
  }
}
