import BaseEntity from '../../../../common/domain/base.entity';

export default class ArticleLikeEntity extends BaseEntity {
  constructor(data: ArticleLikeEntity) {
    super();
    this.id = data.id;
    this.userId = data.userId;
    this.articleId = data.articleId;
  }

  id: number;

  userId: string;

  articleId: string;
}
