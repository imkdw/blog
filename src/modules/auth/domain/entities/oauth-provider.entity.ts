import { oAuthProvider } from '@prisma/client';
import BaseEntity from '../../../../common/domain/base.entity';

export const OAuthProviders = {
  GITHUB: 'github',
  GOOGLE: 'google',
  KAKAO: 'kakao',
} as const;
export type IOAuthProviders = (typeof OAuthProviders)[keyof typeof OAuthProviders];

export default class OAuthProvider extends BaseEntity implements oAuthProvider {
  constructor(_oAuthProvider: oAuthProvider) {
    super();
    Object.assign(this, _oAuthProvider);
  }

  readonly id: number;

  readonly name: string;
}
