import { articles } from '@prisma/client';
import BaseEntity from '../../../../common/domain/base.entity';

export default class Article extends BaseEntity implements articles {
  constructor(_article: Article) {
    super();
    Object.assign(this, _article);
  }

  id: string;

  title: string;

  userId: string;

  summary: string;

  content: string;

  thumbnail: string | null;

  viewCount: number = 0;

  likeCount: number = 0;

  commentCount: number = 0;
}
