import { Injectable } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export default class JwtCookieMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const cookies = req.headers.cookie;
    if (!cookies) return next();

    const { accessToken } = this.extracTokenFromCookie(cookies);
    if (!accessToken) return next();

    Object.assign(req.headers, { authorization: `Bearer ${accessToken}` });
    return next();
  }

  private extracTokenFromCookie(cookies: string) {
    const tokenCookies: { [key: string]: string } = {};

    cookies.split(';').forEach((cookie: string) => {
      const trimCookie = cookie.trim();
      const mid = trimCookie.indexOf('=');
      const [key, value] = [trimCookie.slice(0, mid), trimCookie.slice(mid + 1)];
      tokenCookies[key] = value;
    });

    const accessToken = tokenCookies?.accessToken || '';
    const refreshToken = tokenCookies?.refreshToken || '';

    return { accessToken, refreshToken };
  }
}
