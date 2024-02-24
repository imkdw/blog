import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export const ResponseSuccessType = {
  ok: 'ok',
  error: 'error',
} as const;
type IResponseSuccessType = (typeof ResponseSuccessType)[keyof typeof ResponseSuccessType];

export interface ResponseType<T = unknown> {
  status: IResponseSuccessType;
  data?: T;
  error?: unknown;
}

@Injectable()
export default class TransformInterceptor<T> implements NestInterceptor<T, ResponseType<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<ResponseType<T>> {
    return next.handle().pipe(
      map((data) => ({
        status: ResponseSuccessType.ok,
        data,
      })),
      catchError((err) =>
        of({
          status: ResponseSuccessType.error,
          error: err.response?.message || 'Internal server error',
        }),
      ),
    );
  }
}
