import { articleTag } from '@prisma/client';
import BaseEntity from '../../../common/domain/base.entity';

export default class ArticleTag extends BaseEntity implements articleTag {
  readonly articleId: string;

  readonly tagId: number;

  readonly sort: number;
}
