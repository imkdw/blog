import { PickType } from '@nestjs/swagger';
import ArticleComment from './article-comment.domain';

export default class CreateArticleComment extends PickType(ArticleComment, ['userId', 'articleId', 'content']) {
  constructor(data: CreateArticleComment) {
    super();
    this.userId = data.userId;
    this.articleId = data.articleId;
    this.content = data.content;
  }
}
