import { CreateJwtTokenDto } from './dto/internal/create-token.dto';

export const MyJwtServiceSymbol = Symbol('MyJwtService');

export interface MyJwtService {
  /**
   * JWT 토큰 생성
   * @param dto : JWT 토큰 Payload
   * @param tokenType : 토큰 타입 (access | refresh)
   */
  createToken(dto: CreateJwtTokenDto): string;
}
