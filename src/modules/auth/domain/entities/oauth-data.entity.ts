import { oAuthData } from '@prisma/client';
import BaseEntity from '../../../../common/domain/base.entity';

export default class OAuthData extends BaseEntity implements oAuthData {
  constructor(_oauthData: OAuthData) {
    super();
    Object.assign(this, _oauthData);
  }

  readonly id: number;

  email: string;

  providerId: number;

  profile: string | null;

  data: string;

  token: string;
}
