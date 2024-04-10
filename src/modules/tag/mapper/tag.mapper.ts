import Tag from '../domain/tag.domain';

// eslint-disable-next-line import/prefer-default-export
export const toResponseSearchTagDto = (tags: Tag[]) => ({
  tags: tags.map((tag) => ({
    id: tag.id,
    name: tag.name,
  })),
});
