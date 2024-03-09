export const MyJwtServiceKey = Symbol('MyJwtService');

export interface IMyJwtService {
  createToken(tokenType: 'access' | 'refresh', userId: string): string;

  verify(token: string): IJwtToken;
}

export interface IJwtToken {
  userId: string;
}
