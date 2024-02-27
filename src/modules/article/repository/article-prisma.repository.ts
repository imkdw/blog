import { Injectable } from '@nestjs/common';

import Article from '../domain/article.entity';
import { ArticleRepository } from '../types/repository/article.repository';
import { toArticle } from '../mapper/article.mapper';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { TX } from '../../../common/types/prisma';

@Injectable()
export default class ArticlePrismaRepository implements ArticleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findById(articleId: string): Promise<Article | null> {
    const row = await this.prisma.articles.findUnique({ where: { id: articleId, deleteAt: null } });
    return row ? toArticle(row) : null;
  }

  async createArticle(article: Article, tx?: TX): Promise<Article> {
    const prisma = tx || this.prisma;
    const row = await prisma.articles.create({ data: article });
    return toArticle(row);
  }
}
