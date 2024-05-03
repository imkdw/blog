import { PickType } from '@nestjs/swagger';
import ArticleViewTrend from './article-view-trend.entity';

export default class CreateArticleViewTrendEntity extends PickType(ArticleViewTrend, ['viewCount']) {
  constructor(data: CreateArticleViewTrendEntity) {
    super();
    this.viewCount = data.viewCount;
  }

  calculateTodayViewCount(lastTrend: ArticleViewTrend, totalViewCount: number): CreateArticleViewTrendEntity {
    let viewCount = totalViewCount;

    if (lastTrend) {
      viewCount -= lastTrend.viewCount;
    }

    this.viewCount = viewCount;
    return this;
  }
}
