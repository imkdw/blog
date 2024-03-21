import { tags } from '@prisma/client';

import BaseEntity from '../../../../common/domain/base.entity';

export default class Tag extends BaseEntity implements tags {
  constructor(_tag: tags) {
    super();
    this.id = _tag.id;
    this.name = _tag.name;
  }

  readonly id: number;

  name: string;
}
