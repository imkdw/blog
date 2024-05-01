import BaseEntity from '../../../common/domain/base.entity';

export default class CategoryEntity extends BaseEntity {
  constructor(data: CategoryEntity) {
    super();
    this.id = data.id;
    this.parentId = data.parentId;
    this.name = data.name;
    this.param = data.param;
    this.sort = data.sort;
  }

  id: number;

  parentId: number | null;

  name: string;

  param: string;

  sort: number;
}
