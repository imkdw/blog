import BaseEntity from '../../../../common/domain/base.entity';

export default class ArticleCategory extends BaseEntity {
  constructor(data: ArticleCategory) {
    super();
    this.articleId = data.articleId;
    this.categoryId = data.categoryId;
  }

  articleId: string;
  categoryId: number;
}

export class ArticleCategoryBuilder {
  private _articleId: string;
  private _categoryId: number;

  articleId(articleId: string): ArticleCategoryBuilder {
    this._articleId = articleId;
    return this;
  }

  categoryId(categoryId: number): ArticleCategoryBuilder {
    this._categoryId = categoryId;
    return this;
  }

  build(): ArticleCategory {
    return new ArticleCategory({
      articleId: this._articleId,
      categoryId: this._categoryId,
    });
  }
}
