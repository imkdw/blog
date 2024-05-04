import BaseEntity from '../../../../common/domain/base.entity';

export default class ArticleCommentEntity extends BaseEntity {
  constructor(data: ArticleCommentEntity) {
    super();
    this.id = data.id;
    this.articleId = data.articleId;
    this.userId = data.userId;
    this.content = data.content;
    this.createAt = data.createAt;
  }

  id: number;
  articleId: string;
  userId: string;
  content: string;
}

export class ArticleCommentEntityBuilder {
  private _id: number;
  private _articleId: string;
  private _userId: string;
  private _content: string;

  id(id: number): ArticleCommentEntityBuilder {
    this._id = id;
    return this;
  }

  articleId(articleId: string): ArticleCommentEntityBuilder {
    this._articleId = articleId;
    return this;
  }

  userId(userId: string): ArticleCommentEntityBuilder {
    this._userId = userId;
    return this;
  }

  content(content: string): ArticleCommentEntityBuilder {
    this._content = content;
    return this;
  }

  build(): ArticleCommentEntity {
    return new ArticleCommentEntity({
      id: this._id,
      articleId: this._articleId,
      userId: this._userId,
      content: this._content,
    });
  }
}
