import BaseEntity from '../../../common/domain/base.entity';

export default class TagEntity extends BaseEntity {
  constructor(data: TagEntity) {
    super();
    this.id = data.id;
    this.name = data.name;
  }

  id: number;

  name: string;
}
