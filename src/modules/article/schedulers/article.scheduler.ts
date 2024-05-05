import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ArticleViewTrendRepositoryKey, IArticleViewTrendRepository } from '../interfaces/article-view-trend.interface';
import { ArticleRepositoryKey, IArticleRepository, IArticleScheduler } from '../interfaces/article.interface';
import { ArticleViewTrendBuilder } from '../entities/article-view-trend/article-view-trend.entity';

@Injectable()
export default class ArticleScheduler implements IArticleScheduler {
  constructor(
    @Inject(ArticleViewTrendRepositoryKey) private readonly articleViewTrendRepository: IArticleViewTrendRepository,
    @Inject(ArticleRepositoryKey) private readonly articleRepository: IArticleRepository,
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
