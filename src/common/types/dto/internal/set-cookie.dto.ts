import { ICookieMaxage } from '../../enums/cookie-maxage.enum';

export interface SetCookieDto {
  key: string;
  value: string;
  maxAge: ICookieMaxage;
}
