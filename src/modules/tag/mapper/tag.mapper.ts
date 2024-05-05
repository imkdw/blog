import Tag from '../entities/tag.entity';

// eslint-disable-next-line import/prefer-default-export
export const toResponseSearchTagDto = (tags: Tag[]) => ({
  tags: tags.map((tag) => ({
    id: tag.id,
    name: tag.name,
  })),
});
