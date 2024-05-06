import { Injectable } from '@nestjs/common';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import ArticleViewTrend from '../entities/article-view-trend/article-view-trend.entity';
import { applyOption } from '../../../common/utils/repository';

@Injectable()
export default class ArticleViewTrendRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findLast(option?: FindOption): Promise<ArticleViewTrend | null> {
    const row = await this.prisma.articleViewTrend.findFirst({
      where: {
        ...(!option?.includeDeleted && { deleteAt: null }),
      },
      orderBy: { createAt: 'desc' },
    });

    return row ? new ArticleViewTrend(row) : null;
  }

  async save(data: ArticleViewTrend): Promise<ArticleViewTrend> {
    const row = await this.prisma.articleViewTrend.create({ data });
    return new ArticleViewTrend(row);
  }

  async findAll(option?: FindOption): Promise<ArticleViewTrend[]> {
    const rows = await this.prisma.articleViewTrend.findMany({
      where: {
        ...(!option?.includeDeleted && { deleteAt: null }),
      },
    });

    return rows.map((row) => new ArticleViewTrend(row));
  }

  async findManyByDateRange(start: Date, end: Date, option?: FindOption): Promise<ArticleViewTrend[]> {
    // const numbers = Array.from({ length: 100 }, (_, i) => i);
    // const data = numbers.map((i) => ({
    //   createAt: new Date(start.getTime() + i * 1000 * 60 * 60 * 24),
    //   viewCount: Math.floor(Math.random() * 100),
    // }));
    // await this.prisma.articleViewTrend.createMany({ data });

    const rows = await this.prisma.articleViewTrend.findMany({
      where: applyOption(
        {
          createAt: {
            gte: start,
            lte: end,
          },
          ...(!option?.includeDeleted && { deleteAt: null }),
        },
        option,
      ),
    });

    return rows.map((row) => new ArticleViewTrend(row));
  }
}
