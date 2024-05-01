import { OAuthProvider } from '../../enums/auth.enum';

export interface OAuthResult {
  isExist: boolean;
  email: string;
  provider: OAuthProvider;
  token: string;
}

export interface OAuthDto {
  email: string;
  provider: string;
  token: string;
}

export interface ProcessOAuthDto {
  email: string;
  provider: OAuthProvider;
  profile: string;
  data: string;
}
