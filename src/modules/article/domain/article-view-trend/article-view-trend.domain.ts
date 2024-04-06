import BaseEntity from '../../../../common/domain/base.entity';

export default class ArticleViewTrend extends BaseEntity {
  constructor(data: ArticleViewTrend) {
    super();
    Object.assign(this, data);
  }

  id: number;

  viewCount: number;

  date: Date;
}
