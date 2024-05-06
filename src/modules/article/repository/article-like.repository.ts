import { Injectable } from '@nestjs/common';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import ArticleLike from '../entities/article-like/article-like.entity';

@Injectable()
export default class ArticleLikeRepository {
  constructor(private readonly prisma: PrismaService) {}

  async delete(id: number, tx: TX = this.prisma): Promise<void> {
    await tx.articleLike.delete({ where: { id } });
  }

  async save(data: ArticleLike, tx: TX): Promise<void> {
    await tx.articleLike.create({ data });
  }

  async findByArticleAndUserId(
    { articleId, userId }: { articleId: string; userId: string },
    option?: FindOption,
  ): Promise<ArticleLike> {
    const row = await this.prisma.articleLike.findFirst({
      where: { articleId, userId, ...(!option?.includeDeleted && { deleteAt: null }) },
    });

    return row ? new ArticleLike(row) : null;
  }
}
