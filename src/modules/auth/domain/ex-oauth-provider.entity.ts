import { externalOAuthProviders } from '@prisma/client';

import BaseEntity from '../../../common/domain/base.entity';

export const OAuthProvider = {
  KAKAO: 'kakao',
  GITHUB: 'github',
  GOOGLE: 'google',
} as const;
export type IOAuthProvider = (typeof OAuthProvider)[keyof typeof OAuthProvider];

export default class ExternalOAuthProvider extends BaseEntity implements externalOAuthProviders {
  constructor(provider: Partial<ExternalOAuthProvider>) {
    super();
    Object.assign(this, provider);
  }

  id: number;

  name: IOAuthProvider;
}
