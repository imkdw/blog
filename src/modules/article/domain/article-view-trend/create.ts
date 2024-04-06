import { PickType } from '@nestjs/swagger';
import ArticleViewTrend from './article-view-trend.domain';

export default class CreateArticleViewTrend extends PickType(ArticleViewTrend, ['viewCount']) {
  calculateTodayViewCount(lastTrend: ArticleViewTrend, totalViewCount: number): CreateArticleViewTrend {
    let viewCount = totalViewCount;

    if (lastTrend) {
      viewCount -= lastTrend.viewCount;
    }

    this.viewCount = viewCount;
    return this;
  }
}
