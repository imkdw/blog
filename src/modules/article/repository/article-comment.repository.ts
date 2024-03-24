import { Inject, Injectable } from '@nestjs/common';
import { ArticleCommentsWithUser, IArticleCommentRepository } from '../interfaces/article-comment.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import ArticleComment from '../domain/entities/article-comment.entity';
import CreatingArticleComment from '../domain/models/creating-article-comment.model';
import { ArticleMapperKey, IArticleMapper } from '../interfaces/article.interface';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import UpdatingArticleComment from '../domain/models/updating-article-comment.model';

@Injectable()
export default class ArticleCommentRepository implements IArticleCommentRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(ArticleMapperKey) private readonly articleMapper: IArticleMapper,
  ) {}

  async save(data: CreatingArticleComment, tx: TX): Promise<ArticleComment> {
    const row = await tx.articleComment.create({ data });
    return this.articleMapper.toArticleComment(row);
  }

  async findManyByArticeIdWithUser(articleId: string, option: FindOption): Promise<ArticleCommentsWithUser[]> {
    const rows = await this.prisma.articleComment.findMany({
      where: {
        articleId,
        ...(!option.includeDeleted && { deleteAt: null }),
      },
      include: {
        user: true,
      },
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

    return row ? this.articleMapper.toArticleComment(row) : null;
  }

  async update(commentId: number, data: UpdatingArticleComment): Promise<void> {
    await this.prisma.articleComment.update({
      where: { id: commentId },
      data: { content: data.content },
    });
  }

  async delete(commentId: number, tx: TX): Promise<void> {
    await tx.articleComment.delete({
      where: { id: commentId },
    });
  }
}
