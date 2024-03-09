import { Response } from 'express';
import { ICookieMaxage } from '../enums/cookie-maxage.enum';

export const CookieServiceKey = Symbol('CookieService');

export interface ICookieService {
  setCookie(key: string, value: string, maxAge: ICookieMaxage, res: Response): void;

  clearCookie(res: Response, cookies: string[]): void;
}
