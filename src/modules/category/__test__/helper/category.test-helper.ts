import { faker } from '@faker-js/faker';
import Category from '../../domain/entities/category.entity';

interface CreateCategoryParams {
  name?: string;
  param?: string;
  parentId?: number;
}
// eslint-disable-next-line import/prefer-default-export
export const createCategory = async ({ name, param, parentId }: CreateCategoryParams) => {
  const lastCategory = await prisma.category.findFirst({
    orderBy: {
      id: 'desc',
    },
  });

  const createdCategory = await prisma.category.create({
    data: {
      name: name || faker.string.nanoid(20),
      param: param || faker.string.nanoid(20),
      sort: (lastCategory?.sort || 0) + 1,
      ...(parentId && { parentId }),
    },
  });

  return new Category(createdCategory);
};
