import Tag from '../domain/tag.entity';

export const TagRepositorySymbol = Symbol('TagRepository');
export interface TagRepository {
  findByName(name: string): Promise<Tag | null>;

  createTag(tag: Tag): Promise<Tag>;
}
