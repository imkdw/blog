/* eslint-disable @typescript-eslint/no-unused-vars */
import { FindOption } from '../../../../common/interfaces/find-option.interface';
import { TX } from '../../../../common/types/prisma';
import Tag, { TagBuilder } from '../../entities/tag.entity';
import { CreateTagDto, ITagService } from '../../interfaces/tag.interface';

export default class TagServiceStub implements ITagService {
  async create(dto: CreateTagDto, tx?: TX): Promise<Tag> {
    return new TagBuilder().name(dto.name).build();
  }

  async findByName(name: string, option?: FindOption): Promise<Tag> {
    if (name === '999') return null;
    return new TagBuilder().name(name).build();
  }

  async findManyByIds(ids: number[], option: FindOption): Promise<Tag[]> {
    if (!ids.length) return [];
    const tags = ids.map((id) => new TagBuilder().id(id).build());
    return tags;
  }

  async findManyByNames(names: string[]): Promise<Tag[]> {
    if (!names.length) return [];
    const tags = names.map((name) => new TagBuilder().name(name).build());
    return tags;
  }

  async searchTags(tagName: string): Promise<Tag[]> {
    if (tagName === '999') return [];
    return [new TagBuilder().name(tagName).build()];
  }
}
