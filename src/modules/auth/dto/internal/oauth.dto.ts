import { IOAuthProviders } from '../../domain/entities/oauth-provider.entity';

export interface OAuthResult {
  isExist: boolean;
  email: string;
  provider: IOAuthProviders;
  token: string;
}

export interface OAuthDto {
  email: string;
  provider: string;
  token: string;
}

export interface ProcessOAuthDto {
  email: string;
  provider: IOAuthProviders;
  profile: string;
  data: string;
}
