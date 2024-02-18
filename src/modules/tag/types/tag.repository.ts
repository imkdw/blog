import { TX } from '../../../common/types/prisma';
import Tag from '../domain/tag.entity';
import { SearchTagsResult } from './dto/internal/search-tags.dto';

export const TagRepositorySymbol = Symbol('TagRepository');
export interface TagRepository {
  findByName(name: string): Promise<Tag | null>;

  findByPartialName(name: string): Promise<SearchTagsResult | []>;

  createTag(tag: Tag): Promise<Tag>;

  createTags(tags: Tag[], tx?: TX): Promise<Tag[]>;

  findByNames(names: string[]): Promise<Tag[] | []>;
}
