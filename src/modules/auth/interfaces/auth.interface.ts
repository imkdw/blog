import { emailVerification, oAuthData, oAuthProvider } from '@prisma/client';
import UserRole from '../../user/domain/entities/user-role.entity';
import User from '../../user/domain/entities/user.entity';
import { AuthResult } from '../dto/internal/auth-result.dto';
import { ResponseAuthResultDto } from '../dto/response/auth.dto';
import EmailVerification from '../domain/entities/email-verification.entity';
import OAuthData from '../domain/entities/oauth-data.entity';
import OAuthProvider from '../domain/entities/oauth-provider.entity';

export const AuthServiceKey = Symbol('AuthService');
export interface IAuthService {
  refreshToken(cookie: string): string;
}

export const AuthMapperKey = Symbol('AuthMapper');
export interface IAuthMapper {
  toAuthResult(user: User, userRole: UserRole, accessToken: string, refreshToken: string): AuthResult;

  toResponseAuthResultDto(authResult: AuthResult): ResponseAuthResultDto;

  toEmailVerification(_emailVerification: emailVerification): EmailVerification;

  toOAuthData(_oAuthData: oAuthData): OAuthData;

  toOAuthProvider(_oAuthProvider: oAuthProvider): OAuthProvider;
}
