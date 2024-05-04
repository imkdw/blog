import BaseEntity from '../../../../common/domain/base.entity';

export default class Article extends BaseEntity {
  constructor(data: Article) {
    super();
    this.id = data.id;
    this.title = data.title;
    this.userId = data.userId;
    this.summary = data.summary;
    this.content = data.content;
    this.thumbnail = data.thumbnail;
    this.viewCount = data.viewCount ?? 0;
    this.likeCount = data.likeCount ?? 0;
    this.commentCount = data.commentCount ?? 0;
    this.createAt = data.createAt;
  }

  id: string;
  title: string;
  userId: string;
  summary: string;
  content: string;
  thumbnail: string;
  viewCount: number = 0;
  likeCount: number = 0;
  commentCount: number = 0;
}

export class ArticleBuilder {
  private _id: string;
  private _title: string;
  private _userId: string;
  private _summary: string;
  private _content: string;
  private _thumbnail: string;
  private _viewCount: number;
  private _likeCount: number;
  private _commentCount: number;

  id(id: string): ArticleBuilder {
    this._id = id;
    return this;
  }

  title(title: string): ArticleBuilder {
    this._title = title;
    return this;
  }

  userId(userId: string): ArticleBuilder {
    this._userId = userId;
    return this;
  }

  summary(summary: string): ArticleBuilder {
    this._summary = summary;
    return this;
  }

  content(content: string): ArticleBuilder {
    this._content = content;
    return this;
  }

  thumbnail(thumbnail: string): ArticleBuilder {
    this._thumbnail = thumbnail;
    return this;
  }

  viewCount(viewCount: number): ArticleBuilder {
    this._viewCount = viewCount;
    return this;
  }

  likeCount(likeCount: number): ArticleBuilder {
    this._likeCount = likeCount;
    return this;
  }

  commentCount(commentCount: number): ArticleBuilder {
    this._commentCount = commentCount;
    return this;
  }

  build(): Article {
    return new Article({
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
