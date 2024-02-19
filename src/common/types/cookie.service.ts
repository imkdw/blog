import { Response } from 'express';
import { SetCookieDto } from './dto/internal/set-cookie.dto';

export const CookieServiceSymbol = Symbol('CookieService');
export interface CookieService {
  setCookie(res: Response, dto: SetCookieDto): void;

  clearCookie(res: Response): void;
}
