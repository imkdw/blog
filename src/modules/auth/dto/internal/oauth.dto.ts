import { OAuthProviders } from '../../enums/auth.enum';

export interface OAuthResult {
  isExist: boolean;
  email: string;
  provider: OAuthProviders;
  token: string;
}

export interface OAuthDto {
  email: string;
  provider: string;
  token: string;
}

export interface ProcessOAuthDto {
  email: string;
  provider: OAuthProviders;
  profile: string;
  data: string;
}
