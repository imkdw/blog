import { Injectable } from '@nestjs/common';
import { Response } from 'express';

import { CookieService } from '../types/cookie.service';
import { SetCookieDto } from '../types/dto/internal/set-cookie.dto';

@Injectable()
export default class CookieServiceImpl implements CookieService {
  // TODO: 쿠키 도메인 변경하기
  private readonly domain = 'localhost';

  setCookie(res: Response, dto: SetCookieDto): void {
    const { key, value, maxAge } = dto;

    res.cookie(key, value, {
      domain: this.domain,
      httpOnly: true,
      path: '/',
      // TODO: secure 활성화
      secure: false,
      maxAge,
      sameSite: 'lax',
    });
  }

  clearCookie(res: Response, cookies: string[]) {
    cookies.forEach((cookie) => {
      res.clearCookie(cookie, {
        domain: this.domain,
      });
    });
  }
}
