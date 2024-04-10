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
