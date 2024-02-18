import Tag from '../domain/tag.entity';
import { CreateTagDto } from './dto/internal/create-tag.dto';
import { SearchTagsResult } from './dto/internal/search-tags.dto';

export const TagServiceSymbol = Symbol('TagService');
export interface TagService {
  createTag(dto: CreateTagDto, userId: string): Promise<Tag>;

  searchTags(name: string): Promise<SearchTagsResult | >;
}
