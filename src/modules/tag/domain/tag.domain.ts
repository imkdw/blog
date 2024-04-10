import BaseEntity from '../../../common/domain/base.entity';

export default class Tag extends BaseEntity {
  constructor(data: Tag) {
    super();
    this.id = data.id;
    this.name = data.name;
  }

  id: number;

  name: string;
}
