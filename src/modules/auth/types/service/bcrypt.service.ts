export const BcryptServiceSymbol = Symbol('BcryptService');

export interface BcryptService {
  // 평문 → 해시 변환
  toHash(text: string): Promise<string>;

  // 평문, 해시 비교
  compare(text: string, hashedText: string): Promise<boolean>;
}
