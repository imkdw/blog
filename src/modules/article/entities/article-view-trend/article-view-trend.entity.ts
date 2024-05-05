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

export class ArticleViewTrendBuilder {
  private _id: number;
  private _viewCount: number;
  private _date: Date;

  id(id: number): ArticleViewTrendBuilder {
    this._id = id;
    return this;
  }

  viewCount(viewCount: number): ArticleViewTrendBuilder {
    this._viewCount = viewCount;
    return this;
  }

  date(date: Date): ArticleViewTrendBuilder {
    this._date = date;
    return this;
  }

  build(): ArticleViewTrend {
    return new ArticleViewTrend({
      id: this._id,
      viewCount: this._viewCount,
      date: this._date,
    });
  }
}
