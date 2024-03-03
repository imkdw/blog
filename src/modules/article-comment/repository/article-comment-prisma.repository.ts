import { Injectable } from '@nestjs/common';
import { ArticleCommentRepository } from '../types/repository/article-comment.repository';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import ArticleComment from '../../article/domain/article-comment.entity';
import { toArticleComment } from '../mapper/article-comment.mapper';
import { TX } from '../../../common/types/prisma';

@Injectable()
export default class ArticleCommentPrismaRepository implements ArticleCommentRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByArticleId(articleId: string): Promise<ArticleComment[]> {
    const rows = await this.prisma.articleComment.findMany({ where: { articleId } });
    return rows.map(toArticleComment);
  }

  async saveArticleComment(articleComment: ArticleComment, tx?: TX): Promise<void> {
    const prisma = tx || this.prisma;
    await prisma.articleComment.create({ data: articleComment });
  }
}
