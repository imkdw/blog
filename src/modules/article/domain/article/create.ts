import { PickType } from '@nestjs/swagger';
import Article from './article.domain';

export default class CreateArticle extends PickType(Article, [
  'id',
  'title',
  'userId',
  'summary',
  'content',
  'thumbnail',
]) {
  constructor(data: CreateArticle) {
    super();
    this.id = data.id;
    this.title = data.title;
    this.userId = data.userId;
    this.summary = data.summary;
    this.content = data.content;
    this.thumbnail = data.thumbnail;
  }
}
