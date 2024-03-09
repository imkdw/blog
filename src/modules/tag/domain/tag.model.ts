import { tags } from '@prisma/client';

import BaseEntity from '../../../common/domain/base.entity';

export default class Tag extends BaseEntity implements tags {
  readonly id: number;

  readonly name: string;
}
