import { articleLike } from '@prisma/client';
import BaseEntity from '../../../../common/domain/base.entity';

export default class ArticleLike extends BaseEntity implements articleLike {
  constructor(data: ArticleLike) {
    super();
    this.id = data.id;
    this.userId = data.userId;
    this.articleId = data.articleId;
  }

  readonly id: number;

  userId: string;

  articleId: string;
}
