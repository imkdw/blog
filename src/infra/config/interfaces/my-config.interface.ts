import { MyConfig } from '../enums/my-config.enum';

export const MyConfigServiceKey = Symbol('MyConfigService');

export interface IMyConfigService {
  getConfig<T>(name: MyConfig): Promise<T>;
}

export interface JwtConfig {
  secret: string;
  accessTokenExpiresIn: string;
  refreshTokenExpiresIn: string;
}

export interface BcryptConfig {
  salt: number;
}

export interface OAuthConfig {
  github: {
    clientId: string;
    clientSecret: string;
  };
  kakao: {
    clientId: string;
  };
}

export interface DomainConfig {
  server: string;
  client: string;
}
