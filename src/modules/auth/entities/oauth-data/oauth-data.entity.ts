import BaseEntity from '../../../../common/domain/base.entity';

export default class OAuthDataEntity extends BaseEntity {
  constructor(data: OAuthDataEntity) {
    super();

    this.id = data.id;
    this.email = data.email;
    this.providerId = data.providerId;
    this.profile = data.profile;
    this.data = data.data;
  }

  id: number;

  email: string;

  providerId: number;

  profile: string | null;

  data: string;

  token: string;
}
