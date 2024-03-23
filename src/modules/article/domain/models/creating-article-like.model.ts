import { PickType } from '@nestjs/swagger';
import ArticleLike from '../entities/article-like.entity';

export default class CreatingArticleLike extends PickType(ArticleLike, ['articleId', 'userId']) {
  constructor(data: CreatingArticleLike) {
    super();
    this.articleId = data.articleId;
    this.userId = data.userId;
  }
}
