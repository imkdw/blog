import { category } from '@prisma/client';
import BaseEntity from '../../../common/domain/base.entity';

export default class Category extends BaseEntity implements category {
  constructor(_category: Category) {
    super();
    Object.assign(this, _category);
  }

  readonly id: number;

  readonly parentId: number | null;

  readonly name: string;

  readonly param: string;

  readonly sort: number;
}
