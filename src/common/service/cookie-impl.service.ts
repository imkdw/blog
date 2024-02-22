import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Response } from 'express';

import { CookieService } from '../types/cookie.service';
import { SetCookieDto } from '../types/dto/internal/set-cookie.dto';
import { DomainConfig } from '../../infra/config/types/my-config.interface';
import MyConfigServiceImpl from '../../infra/config/service/my-config-impl.service';
import { MyConfigService } from '../../infra/config/types/my-config.service';
import { MyConfig } from '../../infra/config/types/enum/my-config.enum';
import { NODE_ENVIROMENT } from '../constants/env.constant';

@Injectable()
export default class CookieServiceImpl implements CookieService, OnModuleInit {
  private domainConfig: DomainConfig;

  private isSecure = process.env.NODE_ENV === NODE_ENVIROMENT.PRODUCTION;

  constructor(@Inject(MyConfigServiceImpl) private readonly myConfigService: MyConfigService) {}

  async onModuleInit() {
    this.domainConfig = await this.myConfigService.getConfig<DomainConfig>(MyConfig.DOMAIN);
  }

  setCookie(res: Response, dto: SetCookieDto): void {
    const { key, value, maxAge } = dto;

    res.cookie(key, value, {
      domain: this.domainConfig.client,
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
