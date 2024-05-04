import { Injectable } from '@nestjs/common';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { IArticleLikeRepository } from '../interfaces/article-like.interface';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import ArticleLikeEntity from '../entities/article-like/article-like.entity';

@Injectable()
export default class ArticleLikeRepository implements IArticleLikeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(dto: Partial<ArticleLikeEntity>, option: FindOption): Promise<ArticleLikeEntity | null> {
    const row = await this.prisma.articleLike.findFirst({
      where: {
        ...dto,
        ...(!option?.includeDeleted && { deleteAt: null }),
      },
    });

    return row ? new ArticleLikeEntity(row) : null;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.articleLike.delete({ where: { id } });
  }

  async save(data: ArticleLikeEntity, tx: TX): Promise<void> {
    await tx.articleLike.create({ data });
  }
}
