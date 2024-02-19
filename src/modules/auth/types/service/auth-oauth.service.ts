import ExternalOAuthProvider, { IOAuthProvider } from '../../domain/ex-oauth-provider';
import { OAuthSignUpDto } from '../dto/internal/oauth-sign-up.dto';
import { ProcessOAuthResult } from '../dto/internal/process-oauth.dto';
import { SignUpResult } from '../dto/internal/sign-up.dto';

export const AuthOAuthServiceSymbol = Symbol('AuthOAuthService');

export interface AuthOAuthService {
  findOAuthProviderByName(name: string): Promise<ExternalOAuthProvider | null>;

  googleOAuth(authorization: string): Promise<ProcessOAuthResult>;

  oAuthSignUp(dto: OAuthSignUpDto): Promise<SignUpResult>;

  processOAuth(email: string, oAuthProvider: IOAuthProvider, data: string): Promise<ProcessOAuthResult>;
}
