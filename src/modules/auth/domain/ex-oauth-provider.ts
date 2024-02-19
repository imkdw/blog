import { externalOAuthProviders } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

import BaseEntity from '../../../common/domain/base.entity';

export const OAuthProvider = {
  KAKAO: 'kakao',
  GITHUB: 'github',
  GOOGLE: 'google',
} as const;
export type IOAuthProvider = (typeof OAuthProvider)[keyof typeof OAuthProvider];

export default class ExternalOAuthProvider extends BaseEntity implements externalOAuthProviders {
  @ApiProperty({ description: '고유 ID' })
  id: number;

  @ApiProperty({ description: '인증 제공자' })
  name: IOAuthProvider;
}
