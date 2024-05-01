import TagEntity from '../entities/tag.entity';

// eslint-disable-next-line import/prefer-default-export
export const toResponseSearchTagDto = (tags: TagEntity[]) => ({
  tags: tags.map((tag) => ({
    id: tag.id,
    name: tag.name,
  })),
});
