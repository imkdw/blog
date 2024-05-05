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

export class TagBuilder {
  private _id: number;
  private _name: string;

  id(id: number) {
    this._id = id;
    return this;
  }

  name(name: string) {
    this._name = name;
    return this;
  }

  build() {
    return new Tag({
      id: this._id,
      name: this._name,
    });
  }
}
