import { Injectable } from '@nestjs/common';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import { ITagRepository } from '../interfaces/tag.interface';
import Tag from '../entities/tag.entity';
import { applyOption } from '../../../common/utils/repository';

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

  async save(tag: Tag, tx?: TX): Promise<Tag> {
    const prisma = tx ?? this.prisma;
    const row = await prisma.tags.create({ data: tag });
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

  // async findManyByIds(ids: number[], option?: FindOption): Promise<Tag[]> {
  //   const rows = await this.prisma.tags.findMany({
  //     where: {
  //       id: {
  //         in: ids,
  //       },
  //       ...(!option?.includeDeleted && { deleteAt: null }),
  //     },
  //   });

  //   return rows.map((row) => new Tag(row));
  // }

  async findManyByIds(ids: number[], option?: FindOption): Promise<Tag[]> {
    const rows = await this.prisma.tags.findMany({
      where: applyOption({ id: { in: ids } }, option),
    });

    return rows.map((row) => new Tag(row));
  }

  async findByName(name: string, option?: FindOption): Promise<Tag> {
    const row = await this.prisma.tags.findFirst({
      where: {
        name,
        ...(!option?.includeDeleted && { deleteAt: null }),
      },
    });

    return row ? new Tag(row) : null;
  }
}
