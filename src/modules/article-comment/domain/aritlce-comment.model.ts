import { articleComment } from '@prisma/client';
import BaseEntity from '../../../common/domain/base.entity';

export default class ArticleComment extends BaseEntity implements articleComment {
  readonly id: number;

  readonly articleId: string;

  readonly userId: string;

  readonly content: string;
}
