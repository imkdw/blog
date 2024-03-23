import { PickType } from '@nestjs/swagger';
import ArticleComment from '../entities/article-comment.entity';

export default class CreatingArticleComment extends PickType(ArticleComment, ['userId', 'articleId', 'content']) {
  constructor(data: CreatingArticleComment) {
    super();
    this.userId = data.userId;
    this.articleId = data.articleId;
    this.content = data.content;
  }
}
