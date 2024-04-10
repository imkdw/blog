import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import CreateTag from '../domain/create';
import Tag from '../domain/tag.domain';

export const TagServiceKey = Symbol('TagService');
export interface ITagService {
  create(dto: CreateTagDto, tx: TX): Promise<Tag>;

  searchTags(tagName: string): Promise<Tag[] | null>;

  findManyByIds(ids: number[], option: FindOption): Promise<Tag[]>;

  findManyByNames(names: string[]): Promise<Tag[]>;

  findOne(dto: Partial<Tag>, option: FindOption): Promise<Tag | null>;
}

export const TagRepositoryKey = Symbol('TagRepository');
export interface ITagRepository {
  save(tag: CreateTag, tx: TX): Promise<Tag>;
  findManyByNameWithContains(name: string, option: FindOption): Promise<Tag[]>;
  findManyByNames(names: string[], option: FindOption): Promise<Tag[]>;
  findOne(dto: Partial<Tag>, option: FindOption): Promise<Tag | null>;
  findManyByIds(ids: number[], option: FindOption): Promise<Tag[]>;
}

export interface CreateTagDto {
  name: string;
}
