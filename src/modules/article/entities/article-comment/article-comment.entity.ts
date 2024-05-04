import BaseEntity from '../../../../common/domain/base.entity';
import { NotAuthorOfCommentException } from '../../../../common/exceptions/403';

export default class ArticleComment extends BaseEntity {
  constructor(data: Omit<ArticleComment, 'checkAuthor'>) {
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

  checkAuthor(userId: string): void {
    if (this.userId !== userId) {
      throw new NotAuthorOfCommentException({
        userId,
        commentId: this.id,
      });
    }
  }
}

export class ArticleCommentBuilder {
  private _id: number;
  private _articleId: string;
  private _userId: string;
  private _content: string;

  id(id: number): ArticleCommentBuilder {
    this._id = id;
    return this;
  }

  articleId(articleId: string): ArticleCommentBuilder {
    this._articleId = articleId;
    return this;
  }

  userId(userId: string): ArticleCommentBuilder {
    this._userId = userId;
    return this;
  }

  content(content: string): ArticleCommentBuilder {
    this._content = content;
    return this;
  }

  build(): ArticleComment {
    return new ArticleComment({
      id: this._id,
      articleId: this._articleId,
      userId: this._userId,
      content: this._content,
    });
  }
}
