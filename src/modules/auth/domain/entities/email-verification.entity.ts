import { emailVerification } from '@prisma/client';

import BaseEntity from '../../../../common/domain/base.entity';

export default class EmailVerification extends BaseEntity implements emailVerification {
  constructor(_emailVerification: EmailVerification) {
    super();
    Object.assign(this, _emailVerification);
  }

  id: number;

  email: string;

  code: string;

  expiredAt: Date;

  verifiedAt: Date | null;
}
