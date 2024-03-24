import { Inject, Injectable } from '@nestjs/common';
import { ITagMapper, ITagRepository, TagMapperKey } from '../interfaces/tag.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import Tag from '../domain/entities/tag.entity';
import { TX } from '../../../common/types/prisma';

@Injectable()
export default class TagRepository implements ITagRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(TagMapperKey) private readonly tagMapper: ITagMapper,
  ) {}

  async findManyByNames(names: string[], option: FindOption): Promise<Tag[]> {
    const tags = await this.prisma.tags.findMany({
      where: {
        name: {
          in: names,
        },
        ...(!option.includeDeleted && { deleteAt: null }),
      },
    });

    return tags.map(this.tagMapper.toTag);
  }

  async findOne(dto: Partial<Tag>, option: FindOption): Promise<Tag | null> {
    const row = await this.prisma.tags.findFirst({
      where: {
        ...dto,
        ...(!option.includeDeleted && { deleteAt: null }),
      },
    });

    return row ? this.tagMapper.toTag(row) : null;
  }

  async save(tag: Tag, tx: TX): Promise<Tag> {
    const createdTag = await tx.tags.create({ data: tag });
    return this.tagMapper.toTag(createdTag);
  }

  async findManyByNameWithContains(name: string, option: FindOption): Promise<Tag[]> {
    const tag = await this.prisma.tags.findMany({
      where: {
        name: {
          contains: name,
        },
        ...(!option.includeDeleted && { deleteAt: null }),
      },
    });

    return tag.map(this.tagMapper.toTag);
  }

  async findManyByIds(ids: number[], option: FindOption): Promise<Tag[]> {
    const tags = await this.prisma.tags.findMany({
      where: {
        id: {
          in: ids,
        },
        ...(!option.includeDeleted && { deleteAt: null }),
      },
    });

    return tags.map(this.tagMapper.toTag);
  }
}
