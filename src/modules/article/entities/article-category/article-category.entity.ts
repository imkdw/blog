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

export class ArticleCategoryEntityBuilder {
  private _articleId: string;
  private _categoryId: number;

  articleId(articleId: string): ArticleCategoryEntityBuilder {
    this._articleId = articleId;
    return this;
  }

  categoryId(categoryId: number): ArticleCategoryEntityBuilder {
    this._categoryId = categoryId;
    return this;
  }

  build(): ArticleCategoryEntity {
    return new ArticleCategoryEntity({
      articleId: this._articleId,
      categoryId: this._categoryId,
    });
  }
}
