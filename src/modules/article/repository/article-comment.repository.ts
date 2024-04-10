import { Injectable } from '@nestjs/common';
import { ArticleCommentsWithUser, IArticleCommentRepository } from '../interfaces/article-comment.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import ArticleComment from '../domain/article-comment/article-comment.domain';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import CreateArticleComment from '../domain/article-comment/create';
import UpdateArticleComment from '../domain/article-comment/update';

@Injectable()
export default class ArticleCommentRepository implements IArticleCommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(data: CreateArticleComment, tx: TX): Promise<ArticleComment> {
    const row = await tx.articleComment.create({ data });
    return new ArticleComment(row);
  }

  async findManyByArticeIdWithUser(articleId: string, option: FindOption): Promise<ArticleCommentsWithUser[]> {
    const rows = await this.prisma.articleComment.findMany({
      where: {
        articleId,
        ...(!option.includeDeleted && { deleteAt: null }),
      },
      include: { user: true },
    });

    return rows;
  }

  async findOne(dto: Partial<ArticleComment>, option: FindOption): Promise<ArticleComment | null> {
    const row = await this.prisma.articleComment.findFirst({
      where: {
        ...dto,
        ...(!option.includeDeleted && { deleteAt: null }),
      },
    });

    return row ? new ArticleComment(row) : null;
  }

  async update(commentId: number, data: UpdateArticleComment): Promise<void> {
    await this.prisma.articleComment.update({
      where: { id: commentId },
      data,
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
