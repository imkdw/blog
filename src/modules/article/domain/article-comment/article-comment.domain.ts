import BaseEntity from '../../../../common/domain/base.entity';

export default class ArticleComment extends BaseEntity {
  constructor(data: ArticleComment) {
    super();
    this.id = data.id;
    this.articleId = data.articleId;
    this.userId = data.userId;
    this.content = data.content;
    this.createAt = data.createAt;
  }

  id: number;

  articleId: string;

  userId: string;

  content: string;
}
