import { CallHandler, ExecutionContext, Inject, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Request } from 'express';

import {
  ILocalStorageService,
  LocalStorageServiceKey,
} from '../../infra/local-storage/interfaces/local-storage.interface';

// 예: NestJS 인터셉터에서 AsyncLocalStorage 사용
@Injectable()
export default class ContextInterceptor implements NestInterceptor {
  constructor(@Inject(LocalStorageServiceKey) private readonly localStorageService: ILocalStorageService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const request = context.switchToHttp().getRequest<Request>();
    const userId = request.user?.userId; // 요청으로부터 userId를 얻음

    return new Observable((subscriber) => {
      this.localStorageService.saveUserId(userId, () => {
        next.handle().subscribe({
          next: (value) => subscriber.next(value),
          error: (err) => subscriber.error(err),
          complete: () => subscriber.complete(),
        });
      });
    });
  }
}
