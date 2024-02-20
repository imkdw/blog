import ExternalOAuthProvider, { IOAuthProvider } from '../../domain/ex-oauth-provider';
import { OAuthSignInDto } from '../dto/internal/oauth-sign-in.dto';
import { OAuthSignUpDto } from '../dto/internal/oauth-sign-up.dto';
import { ProcessOAuthResult } from '../dto/internal/process-oauth.dto';
import { SignInResult } from '../dto/internal/sign-in.dto';

export const AuthOAuthServiceSymbol = Symbol('AuthOAuthService');

export interface AuthOAuthService {
  findOAuthProviderByName(name: string): Promise<ExternalOAuthProvider | null>;

  googleOAuth(authorization: string): Promise<ProcessOAuthResult>;

  oAuthSignUp(dto: OAuthSignUpDto): Promise<SignInResult>;

  oAuthSignIn(dto: OAuthSignInDto): Promise<SignInResult>;

  processOAuth(email: string, oAuthProvider: IOAuthProvider, data: string): Promise<ProcessOAuthResult>;
}
