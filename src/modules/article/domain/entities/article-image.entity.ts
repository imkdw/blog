import { articleImage } from '@prisma/client';
import BaseEntity from '../../../../common/domain/base.entity';

export default class ArticleImage extends BaseEntity implements articleImage {
  constructor(_articleImage: ArticleImage) {
    super();
    Object.assign(this, _articleImage);
  }

  readonly id: number;

  readonly articleId: string;

  readonly image: string;

  readonly sort: number;
}
