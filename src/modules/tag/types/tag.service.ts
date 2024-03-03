import { TX } from '../../../common/types/prisma';
import Tag from '../domain/tag.entity';
import { CreateTagDto } from './dto/internal/create-tag.dto';
import { GetTagsDto } from './dto/internal/get-tags.dto';

export const TagServiceSymbol = Symbol('TagService');
export interface TagService {
  createTag(dto: CreateTagDto, userId: string): Promise<Tag>;

  createTags(dto: CreateTagDto[], userId: string, tx?: TX): Promise<Tag[]>;

  findTagsByNames(findTagsByNames: string[]): Promise<Tag[] | []>;

  getTags(dto: GetTagsDto): Promise<Tag[]>;
}
