import BaseEntity from '../../../common/domain/base.entity';

export default class OAuthProviderEntity extends BaseEntity {
  constructor(data: OAuthProviderEntity) {
    super();
    this.id = data.id;
    this.name = data.name;
  }

  id: number;

  name: string;
}
