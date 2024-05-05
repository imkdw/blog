import BaseEntity from '../../../../common/domain/base.entity';

export default class ArticleViewTrend extends BaseEntity {
  constructor(data: ArticleViewTrend) {
    super();
    this.id = data.id;
    this.viewCount = data.viewCount;
  }

  id: number;
  viewCount: number;
}

export class ArticleViewTrendBuilder {
  private _id: number;
  private _viewCount: number;

  id(id: number): ArticleViewTrendBuilder {
    this._id = id;
    return this;
  }

  viewCount(viewCount: number): ArticleViewTrendBuilder {
    this._viewCount = viewCount;
    return this;
  }


  build(): ArticleViewTrend {
    return new ArticleViewTrend({
      id: this._id,
      viewCount: this._viewCount,
    });
  }
}
