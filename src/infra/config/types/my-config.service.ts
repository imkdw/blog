import { IMyConfig } from './enum/my-config.enum';

export const MyConfigServiceSymbol = Symbol('MyConfigService');

export interface MyConfigService {
  getConfig<T>(name: IMyConfig): Promise<T>;
}
