import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

import { ILocalStorageService } from '../interfaces/local-storage.interface';

@Injectable()
export default class LocalStorageService implements ILocalStorageService {
  private storage: AsyncLocalStorage<string | null>;

  constructor() {
    this.storage = new AsyncLocalStorage();
  }

  saveUserId(userId: string, cb: () => void): void {
    this.storage.run(userId, cb);
  }

  getUserId(): string | null {
    return this.storage.getStore();
  }
}
