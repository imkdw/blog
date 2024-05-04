import BaseEntity from '../../../common/domain/base.entity';

export default class OAuthProvider extends BaseEntity {
  constructor(data: OAuthProvider) {
    super();
    this.id = data.id;
    this.name = data.name;
  }

  id: number;

  name: string;
}
