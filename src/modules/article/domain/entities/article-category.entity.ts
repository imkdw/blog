import { articleCategory } from '@prisma/client';
import BaseEntity from '../../../../common/domain/base.entity';

export default class ArticleCategory extends BaseEntity implements articleCategory {
  constructor(data: ArticleCategory) {
    super();
    this.articleId = data.articleId;
    this.categoryId = data.categoryId;
  }

  articleId: string;

  categoryId: number;
}
