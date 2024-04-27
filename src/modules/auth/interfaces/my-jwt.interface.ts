import { JwtTokenType } from '../enums/token.enum';

export const MyJwtServiceKey = Symbol('MyJwtService');

export interface IMyJwtService {
  createToken(tokenType: JwtTokenType, userId: string): string;

  verify(token: string): IJwtToken;
}

export interface IJwtToken {
  userId: string;
}
