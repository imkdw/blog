import { Injectable } from '@nestjs/common';
import { ArticleCommentsWithUser, IArticleCommentRepository } from '../interfaces/article-comment.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import ArticleCommentEntity from '../entities/article-comment/article-comment.entity';

@Injectable()
export default class ArticleCommentRepository implements IArticleCommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(data: ArticleCommentEntity, tx: TX): Promise<ArticleCommentEntity> {
    const row = await tx.articleComment.create({ data });
    return new ArticleCommentEntity(row);
  }

  async findManyByArticeIdWithUser(articleId: string, option: FindOption): Promise<ArticleCommentsWithUser[]> {
    const rows = await this.prisma.articleComment.findMany({
      where: {
        articleId,
        ...(!option?.includeDeleted && { deleteAt: null }),
      },
      include: { user: true },
    });

    return rows;
  }

  async findOne(dto: Partial<ArticleCommentEntity>, option: FindOption): Promise<ArticleCommentEntity | null> {
    const row = await this.prisma.articleComment.findFirst({
      where: {
        ...dto,
        ...(!option?.includeDeleted && { deleteAt: null }),
      },
    });

    return row ? new ArticleCommentEntity(row) : null;
  }

  async update(commentId: number, content: string): Promise<void> {
    await this.prisma.articleComment.update({
      where: { id: commentId },
      data: { content },
    });
  }

  async delete(commentId: number, tx: TX): Promise<void> {
    await tx.articleComment.delete({
      where: { id: commentId },
    });
  }

  async deleteManyByIds(ids: number[], tx: TX): Promise<void> {
    await tx.articleComment.deleteMany({
      where: { id: { in: ids } },
    });
  }
}
