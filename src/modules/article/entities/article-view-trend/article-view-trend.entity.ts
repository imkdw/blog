import BaseEntity from '../../../../common/domain/base.entity';

export default class ArticleViewTrendEntity extends BaseEntity {
  constructor(data: ArticleViewTrendEntity) {
    super();
    this.id = data.id;
    this.viewCount = data.viewCount;
    this.date = data.date;
  }

  id: number;

  viewCount: number;

  date: Date;
}
