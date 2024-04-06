import { Inject, Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { ArticleViewTrendRepositoryKey, IArticleViewTrendRepository } from '../interfaces/article-view-trend.interface';
import { ArticleRepositoryKey, IArticleRepository, IArticleScheduler } from '../interfaces/article.interface';
import CreateArticleViewTrend from '../domain/article-view-trend/create';

@Injectable()
export default class ArticleScheduler implements IArticleScheduler {
  constructor(
    @Inject(ArticleViewTrendRepositoryKey) private readonly articleViewTrendRepository: IArticleViewTrendRepository,
    @Inject(ArticleRepositoryKey) private readonly articleRepository: IArticleRepository,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT, { timeZone: 'Asia/Seoul' })
  async createArticleViewTrend() {
    /**
     * 조회수 집계를 위한 스케줄러
     *
     * 매일 00시에 실행된다
     */
    const lastViewTrend = await this.articleViewTrendRepository.findLastOne({ includeDeleted: false });
    const articles = await this.articleRepository.findMany({}, { includeDeleted: false });
    const articleViewCounts = articles.reduce((acc, article) => acc + article.viewCount, 0);
    const articleViewTrend = new CreateArticleViewTrend().calculateTodayViewCount(lastViewTrend, articleViewCounts);

    await this.articleViewTrendRepository.create(articleViewTrend);

    // TODO: 슬랙 로깅
  }
}
