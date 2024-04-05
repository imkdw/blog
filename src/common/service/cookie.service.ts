import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Response } from 'express';

import { MyConfig } from '../../infra/config/enums/my-config.enum';
import { NODE_ENVIROMENT } from '../constants/env.constant';
import { ICookieService } from '../interfaces/cookie.interface';
import { DomainConfig, IMyConfigService, MyConfigServiceKey } from '../../infra/config/interfaces/my-config.interface';
import { ICookieMaxage } from '../enums/cookie-maxage.enum';

@Injectable()
export default class CookieService implements ICookieService, OnModuleInit {
  private domainConfig: DomainConfig;

  private readonly isSecure = process.env.NODE_ENV === NODE_ENVIROMENT.PRODUCTION;

  private readonly isLocal = process.env.NODE_ENV === NODE_ENVIROMENT.LOCAL;

  constructor(@Inject(MyConfigServiceKey) private readonly myConfigService: IMyConfigService) {}

  async onModuleInit() {
    this.domainConfig = await this.myConfigService.getConfig<DomainConfig>(MyConfig.DOMAIN);
  }

  setCookie(key: string, value: string, maxAge: ICookieMaxage, res: Response): void {
    res.cookie(key, value, {
      ...(this.isLocal ? { domain: 'localhost' } : { domain: this.domainConfig.client }),
      httpOnly: true,
      path: '/',
      secure: this.isSecure,
      maxAge,
      sameSite: 'lax',
    });
  }

  clearCookie(res: Response, cookies: string[]) {
    cookies.forEach((cookie) => {
      res.clearCookie(cookie, {
        domain: this.domainConfig.client,
      });
    });
  }
}
