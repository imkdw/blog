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

export class ArticleViewTrendEntityBuilder {
  private _id: number;
  private _viewCount: number;
  private _date: Date;

  id(id: number): ArticleViewTrendEntityBuilder {
    this._id = id;
    return this;
  }

  viewCount(viewCount: number): ArticleViewTrendEntityBuilder {
    this._viewCount = viewCount;
    return this;
  }

  date(date: Date): ArticleViewTrendEntityBuilder {
    this._date = date;
    return this;
  }

  build(): ArticleViewTrendEntity {
    return new ArticleViewTrendEntity({
      id: this._id,
      viewCount: this._viewCount,
      date: this._date,
    });
  }
}
