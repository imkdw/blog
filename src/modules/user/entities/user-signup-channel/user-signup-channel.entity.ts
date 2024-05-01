import BaseEntity from '../../../../common/domain/base.entity';

export default class UserSignupChannelEntity extends BaseEntity {
  constructor(data: UserSignupChannelEntity) {
    super();
    this.id = data.id;
    this.name = data.name;
  }

  id: number;

  name: string;
}
