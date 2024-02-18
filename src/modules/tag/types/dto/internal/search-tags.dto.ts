import Tag from '../../../domain/tag.entity';

interface SearchTagDto extends Pick<Tag, 'id' | 'name'> {}

export type SearchTagsResult = SearchTagDto[];
