import BaseEntity from '../../../../common/domain/base.entity';

export default class ArticleCategoryEntity extends BaseEntity {
  constructor(data: ArticleCategoryEntity) {
    super();
    this.articleId = data.articleId;
    this.categoryId = data.categoryId;
  }

  articleId: string;

  categoryId: number;
}
