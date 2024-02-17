import { category } from '@prisma/client';
import Category from '../domain/category.entity';

// eslint-disable-next-line import/prefer-default-export
export function toCategory(_category: category): Category {
  return _category;
}
