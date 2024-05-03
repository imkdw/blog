import { PickType } from '@nestjs/swagger';
import ArticleComment from './article-comment.entity';

export default class ArticleCommentCreateEntity extends PickType(ArticleComment, ['userId', 'articleId', 'content']) {
  constructor(data: ArticleCommentCreateEntity) {
    super();
    this.userId = data.userId;
    this.articleId = data.articleId;
    this.content = data.content;
  }
}
