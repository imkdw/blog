import { Inject, Injectable } from '@nestjs/common';
import { IArticleCategoryRepository } from '../interfaces/article-category.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import ArticleCategory from '../domain/entities/article-category.entity';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import { ArticleMapperKey, IArticleMapper } from '../interfaces/article.interface';
import CreatingArticleCategory from '../domain/models/creating-article-category.model';
import { TX } from '../../../common/types/prisma';

@Injectable()
export default class ArticleCategoryRepository implements IArticleCategoryRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(ArticleMapperKey) private readonly articleMapper: IArticleMapper,
  ) {}

  async findMany(dto: Partial<ArticleCategory>, option: FindOption): Promise<ArticleCategory[]> {
    const rows = await this.prisma.articleCategory.findMany({
      where: {
        ...dto,
        ...(!option.includeDeleted && { deleteAt: null }),
      },
    });

    return rows.map((row) => this.articleMapper.toArticleCategory(row));
  }

  async save(data: CreatingArticleCategory, tx: TX): Promise<void> {
    await tx.articleCategory.create({ data });
  }

  async deleteManyByArticleId(articleId: string, tx: TX): Promise<void> {
    await tx.articleCategory.deleteMany({ where: { articleId } });
  }
}
