import BaseEntity from '../../../../common/domain/base.entity';

export default class ArticleLike extends BaseEntity {
  constructor(data: ArticleLike) {
    super();
    this.id = data.id;
    this.userId = data.userId;
    this.articleId = data.articleId;
  }

  id: number;

  userId: string;

  articleId: string;
}
