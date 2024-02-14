import { BcryptConfig, JwtConfig } from './my-config.interface';

export const MyConfigServiceSymbol = Symbol('MyConfigService');

export interface MyConfigService {
  getJwtConfig(): JwtConfig;

  getBcryptConfig(): BcryptConfig;
}
