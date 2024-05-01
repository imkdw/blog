import { Injectable } from '@nestjs/common';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import { ITagRepository } from '../interfaces/tag.interface';
import TagEntity from '../entities/tag.entity';
import TagCreateEntity from '../entities/tag-create.entity';

@Injectable()
export default class TagRepository implements ITagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByNames(names: string[], option: FindOption): Promise<TagEntity[]> {
    const rows = await this.prisma.tags.findMany({
      where: {
        name: {
          in: names,
        },
        ...(!option?.includeDeleted && { deleteAt: null }),
      },
    });

    return rows.map((row) => new TagEntity(row));
  }

  async save(tag: TagCreateEntity, tx?: TX): Promise<TagEntity> {
    const prisma = tx ?? this.prisma;
    const row = await prisma.tags.create({ data: tag });
    return new TagEntity(row);
  }

  async findManyByNameWithContains(name: string, option: FindOption): Promise<TagEntity[]> {
    const rows = await this.prisma.tags.findMany({
      where: {
        name: {
          contains: name,
        },
        ...(!option?.includeDeleted && { deleteAt: null }),
      },
    });

    return rows.map((row) => new TagEntity(row));
  }

  async findManyByIds(ids: number[], option: FindOption): Promise<TagEntity[]> {
    const rows = await this.prisma.tags.findMany({
      where: {
        id: {
          in: ids,
        },
        ...(!option?.includeDeleted && { deleteAt: null }),
      },
    });

    return rows.map((row) => new TagEntity(row));
  }

  async findByName(name: string, option?: FindOption): Promise<TagEntity> {
    const row = await this.prisma.tags.findFirst({
      where: {
        name,
        ...(!option?.includeDeleted && { deleteAt: null }),
      },
    });

    return row ? new TagEntity(row) : null;
  }
}
