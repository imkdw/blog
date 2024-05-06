import { Injectable } from '@nestjs/common';
import { addDays } from 'date-fns';

import ResponseGetArticleViewTrendDto, { GetArticleViewTrendItem } from '../dto/response/get-article-view-trend.dto';
import ArticleViewTrendRepository from '../repository/article-view-trend.repository';

@Injectable()
export default class ArticleTrendService {
  constructor(private readonly articleViewTrendRepository: ArticleViewTrendRepository) {}

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
