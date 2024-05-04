import BaseEntity from '../../../common/domain/base.entity';

export default class Category extends BaseEntity {
  constructor(data: Category) {
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

export class CategoryBuilder {
  private _id: number;
  private _parentId: number | null;
  private _name: string;
  private _param: string;
  private _sort: number;

  id(id: number) {
    this._id = id;
    return this;
  }

  parentId(parentId: number | null) {
    this._parentId = parentId;
    return this;
  }

  name(name: string) {
    this._name = name;
    return this;
  }

  param(param: string) {
    this._param = param;
    return this;
  }

  sort(sort: number) {
    this._sort = sort;
    return this;
  }

  build() {
    return new Category({
      id: this._id,
      parentId: this._parentId,
      name: this._name,
      param: this._param,
      sort: this._sort,
    });
  }
}
