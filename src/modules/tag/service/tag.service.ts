import { Inject, Injectable } from '@nestjs/common';
import { CreateTagDto, ITagRepository, ITagService, TagRepositoryKey } from '../interfaces/tag.interface';
import Tag from '../domain/entities/tag.entity';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import CreatingTag from '../domain/model/createing-tag.model';
import { TX } from '../../../common/types/prisma';

@Injectable()
export default class TagService implements ITagService {
  constructor(@Inject(TagRepositoryKey) private readonly tagRepository: ITagRepository) {}

  async create(dto: CreateTagDto, tx: TX): Promise<Tag> {
    const creatingTag = new CreatingTag({ name: dto.name });
    const createdTag = await this.tagRepository.save(creatingTag, tx);
    return createdTag;
  }

  async searchTags(tagName: string): Promise<Tag[]> {
    const tag = await this.tagRepository.findManyByNameWithContains(tagName, { includeDeleted: false });
    return tag;
  }

  async findManyByIds(ids: number[], option: FindOption): Promise<Tag[]> {
    const tags = await this.tagRepository.findManyByIds(ids, option);
    return tags;
  }

  async findManyByNames(names: string[]): Promise<Tag[]> {
    const tags = await this.tagRepository.findManyByNames(names, { includeDeleted: false });
    return tags;
  }

  async findOne(dto: Partial<Tag>, option: FindOption): Promise<Tag | null> {
    const tag = await this.tagRepository.findOne(dto, option);
    return tag;
  }
}
