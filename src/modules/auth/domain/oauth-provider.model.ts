import { oAuthProvider } from '@prisma/client';
import BaseEntity from '../../../common/domain/base.entity';

export const OAuthProviders = {
  GITHUB: 'GITHUB',
  GOOGLE: 'GOOGLE',
  KAKAO: 'KAKAO',
} as const;
export type IOAuthProviders = (typeof OAuthProviders)[keyof typeof OAuthProviders];

export default class OAuthProvider extends BaseEntity implements oAuthProvider {
  readonly id: number;

  readonly name: string;
}
