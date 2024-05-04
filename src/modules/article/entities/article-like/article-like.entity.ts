import BaseEntity from '../../../../common/domain/base.entity';

export default class ArticleLike extends BaseEntity {
  constructor(data: ArticleLike) {
    super();
    this.id = data.id;
    this.userId = data.userId;
    this.articleId = data.articleId;
  }

  id: number;
  userId: string;
  articleId: string;
}

export class ArticleLikeBuilder {
  private _id: number;
  private _userId: string;
  private _articleId: string;

  id(id: number): ArticleLikeBuilder {
    this._id = id;
    return this;
  }

  userId(userId: string): ArticleLikeBuilder {
    this._userId = userId;
    return this;
  }

  articleId(articleId: string): ArticleLikeBuilder {
    this._articleId = articleId;
    return this;
  }

  build(): ArticleLike {
    return new ArticleLike({
      id: this._id,
      userId: this._userId,
      articleId: this._articleId,
    });
  }
}
