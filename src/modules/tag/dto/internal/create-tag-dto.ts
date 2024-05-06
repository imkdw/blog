import Tag from '../../entities/tag.entity';

export interface CreateTagDto extends Pick<Tag, 'name'> {}
