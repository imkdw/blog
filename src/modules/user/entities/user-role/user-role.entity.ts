import BaseEntity from '../../../../common/domain/base.entity';

export default class UserRoleEntity extends BaseEntity {
  constructor(data: UserRoleEntity) {
    super();
    this.id = data.id;
    this.name = data.name;
  }

  id: number;

  name: string;
}
