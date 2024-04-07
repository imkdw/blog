import { faker } from '@faker-js/faker';

interface CreateTagParams {
  tagName?: string;
}
// eslint-disable-next-line import/prefer-default-export
export const createTag = async ({ tagName }: CreateTagParams) => {
  const createdTag = await prisma.tags.create({
    data: {
      name: tagName ?? faker.lorem.word(),
    },
  });

  return createdTag;
};
