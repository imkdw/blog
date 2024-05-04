import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import Tag from '../entities/tag.entity';

export const TagServiceKey = Symbol('TagService');
export interface ITagService {
  create(dto: CreateTagDto, tx?: TX): Promise<Tag>;
  searchTags(tagName: string): Promise<Tag[] | null>;
  findManyByIds(ids: number[], option: FindOption): Promise<Tag[]>;
  findManyByNames(names: string[]): Promise<Tag[]>;
  findByName(name: string, option?: FindOption): Promise<Tag | null>;
}

export const TagRepositoryKey = Symbol('TagRepository');
export interface ITagRepository {
  save(tag: Tag, tx?: TX): Promise<Tag>;
  findManyByNameWithContains(name: string, option: FindOption): Promise<Tag[]>;
  findManyByNames(names: string[], option: FindOption): Promise<Tag[]>;
  findManyByIds(ids: number[], option: FindOption): Promise<Tag[]>;
  findByName(name: string, option?: FindOption): Promise<Tag | null>;
}

export interface CreateTagDto {
  name: string;
}
