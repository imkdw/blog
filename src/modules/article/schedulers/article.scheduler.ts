import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ArticleViewTrendBuilder } from '../entities/article-view-trend/article-view-trend.entity';
import ArticleViewTrendRepository from '../repository/article-view-trend.repository';
import ArticleRepository from '../repository/article.repository';

@Injectable()
export default class ArticleScheduler {
  constructor(
    private readonly articleViewTrendRepository: ArticleViewTrendRepository,
    private readonly articleRepository: ArticleRepository,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { timeZone: 'Asia/Seoul' })
  // @Cron(CronExpression.EVERY_5_SECONDS, { timeZone: 'Asia/Seoul' })
  async createArticleViewTrend() {
    const trends = await this.articleViewTrendRepository.findAll();
    const totalTrendViewCount = trends.reduce((acc, cur) => acc + cur.viewCount, 0);

    const articles = await this.articleRepository.findAll();
    const totalArticleViewCount = articles.reduce((acc, cur) => acc + cur.viewCount, 0);

    const viewCountDiff = trends.length ? totalArticleViewCount - totalTrendViewCount : totalArticleViewCount;

    const articleViewTrend = new ArticleViewTrendBuilder().viewCount(viewCountDiff).build();

    await this.articleViewTrendRepository.save(articleViewTrend);
  }
}
