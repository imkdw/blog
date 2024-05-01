import { PickType } from '@nestjs/swagger';
import CategoryEntity from './category.entity';

export default class CategoryCreateEntity extends PickType(CategoryEntity, ['parentId', 'name', 'param', 'sort']) {
  constructor(category: CategoryCreateEntity) {
    super(category);
    this.parentId = category.parentId;
    this.name = category.name;
    this.param = category.param;
    this.sort = category.sort;
  }
}

export class CategoryCreateEntityBuilder {
  private parentId: number | null;

  private name: string;

  private param: string;

  private sort: number;

  setParentId(parentId: number): CategoryCreateEntityBuilder {
    this.parentId = parentId;
    return this;
  }

  setName(name: string): CategoryCreateEntityBuilder {
    this.name = name;
    return this;
  }

  setParam(param: string): CategoryCreateEntityBuilder {
    this.param = param;
    return this;
  }

  setSort(sort: number): CategoryCreateEntityBuilder {
    this.sort = sort;
    return this;
  }

  build(): CategoryCreateEntity {
    return new CategoryCreateEntity({
      name: this.name,
      param: this.param,
      parentId: this.parentId,
      sort: this.sort,
    });
  }
}
