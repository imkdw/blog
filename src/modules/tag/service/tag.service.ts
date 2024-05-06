import { Injectable } from '@nestjs/common';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import Tag, { TagBuilder } from '../entities/tag.entity';
import TagRepository from '../repository/tag.repository';
import { CreateTagDto } from '../dto/internal/create-tag-dto';

@Injectable()
export default class TagService {
  constructor(private readonly tagRepository: TagRepository) {}

  async create(dto: CreateTagDto, tx?: TX): Promise<Tag> {
    const tag = new TagBuilder().name(dto.name).build();
    const createdTag = await this.tagRepository.save(tag, tx);
    return createdTag;
  }

  async searchTags(tagName: string): Promise<Tag[]> {
    const tag = await this.tagRepository.findManyByNameWithContains(tagName, { includeDeleted: false });
    return tag;
  }

  async findManyByIds(ids: number[], option?: FindOption): Promise<Tag[]> {
    const tags = await this.tagRepository.findManyByIds(ids, option);
    return tags;
  }

  async findManyByNames(names: string[], option?: FindOption): Promise<Tag[]> {
    const tags = await this.tagRepository.findManyByNames(names, option);
    return tags;
  }

  async findByName(name: string, option?: FindOption): Promise<Tag> {
    const tag = await this.tagRepository.findByName(name, option);
    return tag;
  }
}
