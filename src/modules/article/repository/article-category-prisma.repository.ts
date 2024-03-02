import { Injectable } from '@nestjs/common';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import ArticleCategory from '../domain/article-category.entity';
import { toArticleCategory } from '../mapper/article-category.mapper';
import { ArticleCategoryRepository } from '../types/repository/article-category.repository';
import { TX } from '../../../common/types/prisma';

@Injectable()
export default class ArticleCategoryPrismaRepository implements ArticleCategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByCategoryId(categoryId: number): Promise<ArticleCategory[]> {
    const rows = await this.prisma.articleCategory.findMany({ where: { categoryId } });
    return rows.map(toArticleCategory);
  }

  async saveArticleCategory(articleCategory: ArticleCategory, tx?: TX): Promise<void> {
    const prisma = tx || this.prisma;
    await prisma.articleCategory.create({ data: articleCategory });
  }
}
