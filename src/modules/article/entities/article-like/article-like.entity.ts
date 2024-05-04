import BaseEntity from '../../../../common/domain/base.entity';

export default class ArticleLikeEntity extends BaseEntity {
  constructor(data: ArticleLikeEntity) {
    super();
    this.id = data.id;
    this.userId = data.userId;
    this.articleId = data.articleId;
  }

  id: number;
  userId: string;
  articleId: string;
}

export class ArticleLikeEntityBuilder {
  private _id: number;
  private _userId: string;
  private _articleId: string;

  id(id: number): ArticleLikeEntityBuilder {
    this._id = id;
    return this;
  }

  userId(userId: string): ArticleLikeEntityBuilder {
    this._userId = userId;
    return this;
  }

  articleId(articleId: string): ArticleLikeEntityBuilder {
    this._articleId = articleId;
    return this;
  }

  build(): ArticleLikeEntity {
    return new ArticleLikeEntity({
      id: this._id,
      userId: this._userId,
      articleId: this._articleId,
    });
  }
}
