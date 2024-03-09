import { articleCategory } from '@prisma/client';
import BaseEntity from '../../../common/domain/base.entity';

export default class ArticleCategory extends BaseEntity implements articleCategory {
  readonly id: number;

  readonly articleId: string;

  readonly categoryId: number;
}
