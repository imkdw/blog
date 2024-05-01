import { Injectable } from '@nestjs/common';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import { ITagRepository } from '../interfaces/tag.interface';
import Tag from '../domain/tag.domain';

@Injectable()
export default class TagRepository implements ITagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByNames(names: string[], option: FindOption): Promise<Tag[]> {
    const rows = await this.prisma.tags.findMany({
      where: {
        name: {
          in: names,
        },
        ...(!option?.includeDeleted && { deleteAt: null }),
      },
    });

    return rows.map((row) => new Tag(row));
  }

  async findOne(dto: Partial<Tag>, option: FindOption): Promise<Tag | null> {
    const row = await this.prisma.tags.findFirst({
      where: {
        ...dto,
        ...(!option?.includeDeleted && { deleteAt: null }),
      },
    });

    return row ? new Tag(row) : null;
  }

  async save(tag: Tag, tx: TX): Promise<Tag> {
    const row = await tx.tags.create({ data: tag });
    return new Tag(row);
  }

  async findManyByNameWithContains(name: string, option: FindOption): Promise<Tag[]> {
    const rows = await this.prisma.tags.findMany({
      where: {
        name: {
          contains: name,
        },
        ...(!option?.includeDeleted && { deleteAt: null }),
      },
    });

    return rows.map((row) => new Tag(row));
  }

  async findManyByIds(ids: number[], option: FindOption): Promise<Tag[]> {
    const rows = await this.prisma.tags.findMany({
      where: {
        id: {
          in: ids,
        },
        ...(!option?.includeDeleted && { deleteAt: null }),
      },
    });

    return rows.map((row) => new Tag(row));
  }
}
