import BaseEntity from '../../../../common/domain/base.entity';

export default class ArticleViewTrend extends BaseEntity {
  constructor(data: ArticleViewTrend) {
    super();
    this.id = data.id;
    this.viewCount = data.viewCount;
    this.date = data.date;
  }

  id: number;

  viewCount: number;

  date: Date;
}
