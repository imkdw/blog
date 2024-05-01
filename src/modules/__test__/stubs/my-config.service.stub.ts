/* eslint-disable @typescript-eslint/no-explicit-any */

import { MyConfig } from '../../../infra/config/enums/my-config.enum';
import { IMyConfigService } from '../../../infra/config/interfaces/my-config.interface';

export default class MyConfigServiceStub implements IMyConfigService {
  private memory = new Map<MyConfig, any>();

  constructor() {
    const configKeys = Object.values(MyConfig);
    const configs = {
      [MyConfig.BCRYPT]: {
        salt: 10,
      },
      [MyConfig.JWT]: {
        secret: 'test',
        accessTokenExpiresIn: '1h',
        refreshTokenExpiresIn: '30d',
      },
      [MyConfig.DOMAIN]: {
        client: 'http://localhost:3000',
        server: 'http://localhost:4000',
      },
      [MyConfig.OAUTH]: {
        github: {
          clientId: 'clientId',
          clientSecret: 'clientSecret',
        },
        kakao: {
          clientId: 'clientId',
        },
      },
    };
    configKeys.forEach((key) => {
      this.memory.set(key, configs[key]);
    });
  }

  async getConfig<T>(name: MyConfig): Promise<T> {
    return this.memory.get(name);
  }
}
