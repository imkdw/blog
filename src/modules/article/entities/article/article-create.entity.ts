import { PickType } from '@nestjs/swagger';
import ArticleEntity from './article.entity';

export default class ArticleCreateEntity extends PickType(ArticleEntity, [
  'id',
  'title',
  'userId',
  'summary',
  'content',
  'thumbnail',
]) {
  constructor(data: ArticleCreateEntity) {
    super();
    this.id = data.id;
    this.title = data.title;
    this.userId = data.userId;
    this.summary = data.summary;
    this.content = data.content;
    this.thumbnail = data.thumbnail;
  }
}

export class ArticleCreateEntityBuilder {
  private id: string;

  private title: string;

  private userId: string;

  private summary: string;

  private content: string;

  private thumbnail: string;

  setId(id: string): ArticleCreateEntityBuilder {
    this.id = id;
    return this;
  }

  setTitle(title: string): ArticleCreateEntityBuilder {
    this.title = title;
    return this;
  }

  setUserId(userId: string): ArticleCreateEntityBuilder {
    this.userId = userId;
    return this;
  }

  setSummary(summary: string): ArticleCreateEntityBuilder {
    this.summary = summary;
    return this;
  }

  setContent(content: string): ArticleCreateEntityBuilder {
    this.content = content;
    return this;
  }

  setThumbnail(thumbnail: string): ArticleCreateEntityBuilder {
    this.thumbnail = thumbnail;
    return this;
  }

  build(): ArticleCreateEntity {
    return new ArticleCreateEntity({
      id: this.id,
      content: this.content,
      summary: this.summary,
      thumbnail: this.thumbnail,
      title: this.title,
      userId: this.userId,
    });
  }
}
