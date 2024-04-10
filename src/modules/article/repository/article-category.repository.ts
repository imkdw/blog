import { Injectable } from '@nestjs/common';
import { IArticleCategoryRepository } from '../interfaces/article-category.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import ArticleCategory from '../domain/article-category/article-category.domain';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import CreateArticleCategory from '../domain/article-category/create';

@Injectable()
export default class ArticleCategoryRepository implements IArticleCategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(dto: Partial<ArticleCategory>, option: FindOption): Promise<ArticleCategory[]> {
    const rows = await this.prisma.articleCategory.findMany({
      where: {
        ...dto,
        ...(!option.includeDeleted && { deleteAt: null }),
      },
    });

    return rows.map((row) => new ArticleCategory(row));
  }

  async save(data: CreateArticleCategory, tx: TX): Promise<void> {
    await tx.articleCategory.create({ data });
  }

  async deleteMany(dto: Partial<ArticleCategory>, tx: TX): Promise<void> {
    await tx.articleCategory.deleteMany({ where: dto });
  }
}
