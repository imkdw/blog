import { PickType } from '@nestjs/swagger';
import ArticleComment from '../entities/article-comment.entity';

export default class UpdatingArticleComment extends PickType(ArticleComment, ['content']) {
  constructor(data: UpdatingArticleComment) {
    super();
    this.content = data.content;
  }
}
