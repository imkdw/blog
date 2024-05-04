import BaseEntity from '../../../../common/domain/base.entity';

export default class ArticleEntity extends BaseEntity {
  constructor(data: ArticleEntity) {
    super();
    this.id = data.id;
    this.title = data.title;
    this.userId = data.userId;
    this.summary = data.summary;
    this.content = data.content;
    this.thumbnail = data.thumbnail;
    this.viewCount = data.viewCount;
    this.likeCount = data.likeCount;
    this.commentCount = data.commentCount;
    this.createAt = data.createAt;
  }

  id: string;
  title: string;
  userId: string;
  summary: string;
  content: string;
  thumbnail: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

export class ArticleEntityBuilder {
  private _id: string;
  private _title: string;
  private _userId: string;
  private _summary: string;
  private _content: string;
  private _thumbnail: string;
  private _viewCount: number;
  private _likeCount: number;
  private _commentCount: number;

  id(id: string): ArticleEntityBuilder {
    this._id = id;
    return this;
  }

  title(title: string): ArticleEntityBuilder {
    this._title = title;
    return this;
  }

  userId(userId: string): ArticleEntityBuilder {
    this._userId = userId;
    return this;
  }

  summary(summary: string): ArticleEntityBuilder {
    this._summary = summary;
    return this;
  }

  content(content: string): ArticleEntityBuilder {
    this._content = content;
    return this;
  }

  thumbnail(thumbnail: string): ArticleEntityBuilder {
    this._thumbnail = thumbnail;
    return this;
  }

  viewCount(viewCount: number): ArticleEntityBuilder {
    this._viewCount = viewCount;
    return this;
  }

  likeCount(likeCount: number): ArticleEntityBuilder {
    this._likeCount = likeCount;
    return this;
  }

  commentCount(commentCount: number): ArticleEntityBuilder {
    this._commentCount = commentCount;
    return this;
  }

  build(): ArticleEntity {
    return new ArticleEntity({
      id: this._id,
      title: this._title,
      userId: this._userId,
      summary: this._summary,
      content: this._content,
      thumbnail: this._thumbnail,
      viewCount: this._viewCount,
      likeCount: this._likeCount,
      commentCount: this._commentCount,
    });
  }
}
