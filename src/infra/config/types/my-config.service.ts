import { JwtConfig } from './my-config.interface';

export const MyConfigServiceSymbol = Symbol('MyConfigService');

export interface MyConfigService {
  getJwtConfig(): JwtConfig;
}
