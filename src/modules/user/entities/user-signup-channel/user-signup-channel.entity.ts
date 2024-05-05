import BaseEntity from '../../../../common/domain/base.entity';

export default class UserSignupChannel extends BaseEntity {
  constructor(data: UserSignupChannel) {
    super();
    this.id = data.id;
    this.name = data.name;
  }

  id: number;
  name: string;
}
