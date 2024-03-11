import { oAuthData } from '@prisma/client';
import BaseEntity from '../../../../common/domain/base.entity';

export default class OAuthData extends BaseEntity implements oAuthData {
  readonly id: number;

  readonly email: string;

  readonly providerId: number;

  readonly profile: string | null;

  readonly data: string;

  readonly token: string;
}
