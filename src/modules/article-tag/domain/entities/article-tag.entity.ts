import { articleTag } from '@prisma/client';
import BaseEntity from '../../../../common/domain/base.entity';

export default class ArticleTag extends BaseEntity implements articleTag {
  constructor(_articleTag: ArticleTag) {
    super();
    this.articleId = _articleTag.articleId;
    this.tagId = _articleTag.tagId;
    this.sort = _articleTag.sort;
  }

  articleId: string;

  tagId: number;

  sort: number;
}
