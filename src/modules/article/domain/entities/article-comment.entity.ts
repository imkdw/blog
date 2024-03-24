import { articleComment } from '@prisma/client';
import BaseEntity from '../../../../common/domain/base.entity';

export default class ArticleComment extends BaseEntity implements articleComment {
  constructor(_articleComment: articleComment) {
    super();
    this.id = _articleComment.id;
    this.articleId = _articleComment.articleId;
    this.userId = _articleComment.userId;
    this.content = _articleComment.content;
  }

  readonly id: number;

  articleId: string;

  userId: string;

  content: string;
}
