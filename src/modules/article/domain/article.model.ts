import { articles } from '@prisma/client';
import BaseEntity from '../../../common/domain/base.entity';

export default class Article extends BaseEntity implements articles {
  readonly id: string;

  readonly title: string;

  readonly userId: string;

  readonly summary: string;

  readonly content: string;

  readonly thumbnail: string | null;

  readonly viewCount: number = 0;

  readonly likeCount: number = 0;

  readonly commentCount: number = 0;
}
