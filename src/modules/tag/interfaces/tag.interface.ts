import { tags } from '@prisma/client';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import Tag from '../domain/entities/tag.entity';
import { ResponseSearchTagDto } from '../dto/response/tag.dto';
import CreatingTag from '../domain/model/createing-tag.model';
import { TX } from '../../../common/types/prisma';

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
  save(tag: CreatingTag, tx: TX): Promise<Tag>;
  findManyByNameWithContains(name: string, option: FindOption): Promise<Tag[]>;
  findManyByNames(names: string[], option: FindOption): Promise<Tag[]>;
  findOne(dto: Partial<Tag>, option: FindOption): Promise<Tag | null>;
  findManyByIds(ids: number[], option: FindOption): Promise<Tag[]>;
}

export const TagMapperKey = Symbol('TagMapper');
export interface ITagMapper {
  toTag(_tag: tags): Tag;

  toResponseSearchTagDto(_tags: Tag[]): ResponseSearchTagDto;
}

export interface CreateTagDto {
  name: string;
}
