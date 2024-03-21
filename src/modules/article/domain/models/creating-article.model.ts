import { PickType } from '@nestjs/swagger';
import Article from '../entities/article.entity';

export default class CreatingArticle extends PickType(Article, [
  'id',
  'title',
  'userId',
  'summary',
  'content',
  'thumbnail',
]) {
  constructor(_article: CreatingArticle) {
    super(_article);
    this.id = _article.id;
    this.title = _article.title;
    this.userId = _article.userId;
    this.summary = _article.summary;
    this.content = _article.content;
    this.thumbnail = _article.thumbnail;
  }
}
