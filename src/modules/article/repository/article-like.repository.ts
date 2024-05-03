import { Injectable } from '@nestjs/common';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { IArticleLikeRepository } from '../interfaces/article-like.interface';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import ArticleLike from '../entities/article-like/article-like.entity';
import { TX } from '../../../common/types/prisma';
import CreateArticleLike from '../entities/article-like/create';

@Injectable()
export default class ArticleLikeRepository implements IArticleLikeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(dto: Partial<ArticleLike>, option: FindOption): Promise<ArticleLike | null> {
    const row = await this.prisma.articleLike.findFirst({
      where: {
        ...dto,
        ...(!option?.includeDeleted && { deleteAt: null }),
      },
    });

    return row ? new ArticleLike(row) : null;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.articleLike.delete({ where: { id } });
  }

  async save(data: CreateArticleLike, tx: TX): Promise<void> {
    await tx.articleLike.create({ data });
  }
}
