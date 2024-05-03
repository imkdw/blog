import { PickType } from '@nestjs/swagger';
import ArticleLike from './article-like.entity';

export default class CreateArticleLikeEntity extends PickType(ArticleLike, ['articleId', 'userId']) {
  constructor(data: CreateArticleLikeEntity) {
    super();
    this.articleId = data.articleId;
    this.userId = data.userId;
  }
}
