import { PickType } from '@nestjs/swagger';
import ArticleComment from './article-comment.domain';

export default class UpdateArticleComment extends PickType(ArticleComment, ['content']) {
  constructor(data: UpdateArticleComment) {
    super();
    this.content = data.content;
  }
}
