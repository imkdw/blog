import ExternalOAuthProvider from '../../domain/ex-oauth-provider';
import { GithubOAuthDto } from '../dto/internal/github-oauth.dto';
import { KakaoOAuthDto } from '../dto/internal/kakao-oauth.dto';
import { OAuthSignInDto } from '../dto/internal/oauth-sign-in.dto';
import { OAuthSignUpDto } from '../dto/internal/oauth-sign-up.dto';
import { ProcessOAuthDto, ProcessOAuthResult } from '../dto/internal/process-oauth.dto';
import { SignInResult } from '../dto/internal/sign-in.dto';

export const AuthOAuthServiceSymbol = Symbol('AuthOAuthService');

export interface AuthOAuthService {
  findOAuthProviderByName(name: string): Promise<ExternalOAuthProvider | null>;

  googleOAuth(authorization: string): Promise<ProcessOAuthResult>;

  kakaoOAuth(dto: KakaoOAuthDto): Promise<ProcessOAuthResult>;

  githubOAuth(dto: GithubOAuthDto): Promise<ProcessOAuthResult>;

  oAuthSignUp(dto: OAuthSignUpDto): Promise<SignInResult>;

  oAuthSignIn(dto: OAuthSignInDto): Promise<SignInResult>;

  processOAuth(dto: ProcessOAuthDto): Promise<ProcessOAuthResult>;
}
