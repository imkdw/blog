import BaseEntity from '../../../../common/domain/base.entity';

export default class UserRole extends BaseEntity {
  constructor(data: UserRole) {
    super();
    this.id = data.id;
    this.name = data.name;
  }

  id: number;

  name: string;
}
