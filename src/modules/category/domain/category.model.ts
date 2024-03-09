import { category } from '@prisma/client';
import BaseEntity from '../../../common/domain/base.entity';

export default class Category extends BaseEntity implements category {
  readonly id: number;

  readonly parentId: number | null;

  readonly name: string;

  readonly param: string;

  readonly sort: number;
}
