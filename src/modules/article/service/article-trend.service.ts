import { Inject, Injectable } from '@nestjs/common';
import { addDays } from 'date-fns';

import {
  ArticleViewTrendRepositoryKey,
  IArticleTrendService,
  IArticleViewTrendRepository,
} from '../interfaces/article-view-trend.interface';
import ResponseGetArticleViewTrendDto, { GetArticleViewTrendItem } from '../dto/response/get-article-view-trend.dto';

@Injectable()
export default class ArticleTrendService implements IArticleTrendService {
  constructor(
    @Inject(ArticleViewTrendRepositoryKey) private readonly articleViewTrendRepository: IArticleViewTrendRepository,
  ) {}

  async getArticleViewTrends(duration: number): Promise<ResponseGetArticleViewTrendDto> {
    const now = new Date();

    const start = addDays(now, -duration);
    const end = now;

    const trends = await this.articleViewTrendRepository.findManyByDateRange(start, end);

    const trendItems = trends.map(
      (trend): GetArticleViewTrendItem => ({
        id: trend.id,
        date: trend.createAt,
        viewCount: trend.viewCount,
      }),
    );

    return { viewTrends: trendItems };
  }
}
