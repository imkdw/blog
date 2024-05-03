import { Injectable } from '@nestjs/common';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { IArticleViewTrendRepository } from '../interfaces/article-view-trend.interface';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import ArticleViewTrend from '../entities/article-view-trend/article-view-trend.entity';
import CreateArticleViewTrend from '../entities/article-view-trend/create';

@Injectable()
export default class ArticleViewTrendRepository implements IArticleViewTrendRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findLastOne(option: FindOption): Promise<ArticleViewTrend | null> {
    const row = await this.prisma.articleViewTrend.findFirst({
      where: {
        ...(!option?.includeDeleted && { deleteAt: null }),
      },
      orderBy: { createAt: 'desc' },
    });

    return row ? new ArticleViewTrend(row) : null;
  }

  async create(data: CreateArticleViewTrend): Promise<ArticleViewTrend> {
    const row = await this.prisma.articleViewTrend.create({ data });
    return new ArticleViewTrend(row);
  }
}
