import { Inject, Injectable } from '@nestjs/common';
import { CreateTagDto, ITagRepository, ITagService, TagRepositoryKey } from '../interfaces/tag.interface';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import TagEntity from '../entities/tag.entity';
import TagCreateEntity from '../entities/tag-create.entity';

@Injectable()
export default class TagService implements ITagService {
  constructor(@Inject(TagRepositoryKey) private readonly tagRepository: ITagRepository) {}

  async create(dto: CreateTagDto, tx?: TX): Promise<TagEntity> {
    const creatingTag = new TagCreateEntity({ name: dto.name });
    const createdTag = await this.tagRepository.save(creatingTag, tx);
    return createdTag;
  }

  async searchTags(tagName: string): Promise<TagEntity[]> {
    const tag = await this.tagRepository.findManyByNameWithContains(tagName, { includeDeleted: false });
    return tag;
  }

  async findManyByIds(ids: number[], option?: FindOption): Promise<TagEntity[]> {
    const tags = await this.tagRepository.findManyByIds(ids, option);
    return tags;
  }

  async findManyByNames(names: string[], option?: FindOption): Promise<TagEntity[]> {
    const tags = await this.tagRepository.findManyByNames(names, option);
    return tags;
  }

  async findByName(name: string, option?: FindOption): Promise<TagEntity> {
    const tag = await this.tagRepository.findByName(name, option);
    return tag;
  }
}
