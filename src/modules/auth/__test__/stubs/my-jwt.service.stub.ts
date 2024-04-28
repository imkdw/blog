import { JwtTokenType } from '../../enums/token.enum';
import { IJwtToken, IMyJwtService } from '../../interfaces/my-jwt.interface';

export default class MyJwtServiceStub implements IMyJwtService {
  createToken(tokenType: JwtTokenType, userId: string): string {
    return `token-${tokenType}-${userId}`;
  }

  verify(token: string): IJwtToken {
    if (token === 'expired_token') throw new Error('TokenExpiredError');

    return { userId: 'userId' };
  }
}
