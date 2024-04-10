import { PickType } from '@nestjs/swagger';
import ArticleLike from './article-like.domain';

export default class CreateArticleLike extends PickType(ArticleLike, ['articleId', 'userId']) {
  constructor(data: CreateArticleLike) {
    super();
    this.articleId = data.articleId;
    this.userId = data.userId;
  }
}
