import { TX } from '../../../common/types/prisma';
import Tag from '../domain/tag.entity';

export const TagRepositorySymbol = Symbol('TagRepository');
export interface TagRepository {
  findByName(name: string): Promise<Tag | null>;

  createTag(tag: Tag): Promise<Tag>;

  createTags(tags: Tag[], tx?: TX): Promise<Tag[]>;

  findByNames(names: string[]): Promise<Tag[]>;

  findManyByIds(ids: number[]): Promise<Tag[]>;
}
