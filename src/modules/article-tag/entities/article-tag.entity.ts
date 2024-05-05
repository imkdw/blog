import BaseEntity from '../../../common/domain/base.entity';

export default class ArticleTag extends BaseEntity {
  constructor(data: ArticleTag) {
    super();
    this.articleId = data.articleId;
    this.tagId = data.tagId;
    this.sort = data.sort;
  }

  articleId: string;
  tagId: number;
  sort: number;
}

export class ArticleTagBuilder {
  private _articleId: string;
  private _tagId: number;
  private _sort: number;

  articleId(articleId: string): ArticleTagBuilder {
    this._articleId = articleId;
    return this;
  }

  tagId(tagId: number): ArticleTagBuilder {
    this._tagId = tagId;
    return this;
  }

  sort(sort: number): ArticleTagBuilder {
    this._sort = sort;
    return this;
  }

  build(): ArticleTag {
    return new ArticleTag({
      articleId: this._articleId,
      tagId: this._tagId,
      sort: this._sort,
    });
  }
}
