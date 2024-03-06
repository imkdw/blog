import { AuthResult } from '../dto/internal/auth-result.dto';
import { GithubOAuthDto } from '../dto/internal/github-oauth.dto';
import { KakaoOAuthDto } from '../dto/internal/kakao-oauth.dto';
import { OAuthSignInDto } from '../dto/internal/oauth-sign-in.dto';
import { OAuthSignUpDto } from '../dto/internal/oauth-sign-up.dto';
import { ProcessOAuthDto, ProcessOAuthResult } from '../dto/internal/process-oauth.dto';

export const OAuthServiceSymbol = Symbol('OAuthService');

export interface OAuthService {
  googleOAuth(authorization: string): Promise<ProcessOAuthResult>;

  kakaoOAuth(dto: KakaoOAuthDto): Promise<ProcessOAuthResult>;

  githubOAuth(dto: GithubOAuthDto): Promise<ProcessOAuthResult>;

  oAuthSignUp(dto: OAuthSignUpDto): Promise<AuthResult>;

  oAuthSignIn(dto: OAuthSignInDto): Promise<AuthResult>;

  processOAuth(dto: ProcessOAuthDto): Promise<ProcessOAuthResult>;
}
