import { articleCategory } from '@prisma/client';
import BaseEntity from '../../../../common/domain/base.entity';

export default class ArticleCategory extends BaseEntity implements articleCategory {
  constructor(data: ArticleCategory) {
    super();
    this.id = data.id;
    this.articleId = data.articleId;
    this.categoryId = data.categoryId;
  }

  readonly id: number;

  articleId: string;

  categoryId: number;
}
