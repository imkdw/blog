import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import TagCreateEntity from '../entities/tag-create.entity';
import TagEntity from '../entities/tag.entity';

export const TagServiceKey = Symbol('TagService');
export interface ITagService {
  create(dto: CreateTagDto, tx: TX): Promise<TagEntity>;
  searchTags(tagName: string): Promise<TagEntity[] | null>;
  findManyByIds(ids: number[], option: FindOption): Promise<TagEntity[]>;
  findManyByNames(names: string[]): Promise<TagEntity[]>;
  findByName(name: string, option?: FindOption): Promise<TagEntity | null>;
}

export const TagRepositoryKey = Symbol('TagRepository');
export interface ITagRepository {
  save(tag: TagCreateEntity, tx?: TX): Promise<TagEntity>;
  findManyByNameWithContains(name: string, option: FindOption): Promise<TagEntity[]>;
  findManyByNames(names: string[], option: FindOption): Promise<TagEntity[]>;
  findManyByIds(ids: number[], option: FindOption): Promise<TagEntity[]>;
  findByName(name: string, option?: FindOption): Promise<TagEntity | null>;
}

export interface CreateTagDto {
  name: string;
}
