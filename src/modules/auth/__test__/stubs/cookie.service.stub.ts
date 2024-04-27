/* eslint-disable @typescript-eslint/no-unused-vars */

import { Response } from 'express';
import { ICookieService } from '../../../../common/interfaces/cookie.interface';

export default class CookieServiceStub implements ICookieService {
  clearCookie(res: Response, cookies: string[]): void {}

  setCookie(key: string, value: string, maxAge: number, res: Response): void {
    res.cookie(key, value, { maxAge });
  }
}
