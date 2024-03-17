export const LocalStorageServiceKey = Symbol('LocalStorageService');
export interface ILocalStorageService {
  saveUserId(userId: string, cb: () => void): void;

  getUserId(): string | null;
}
