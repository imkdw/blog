import { externalOAuthData } from '@prisma/client';
import ExternalOAuthData from '../domain/ex-oauth-data.entity';

// eslint-disable-next-line import/prefer-default-export
export function toExOAuthData(_data: externalOAuthData): ExternalOAuthData {
  return _data;
}
