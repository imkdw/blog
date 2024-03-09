import { userRole } from '@prisma/client';

import { UserRoles } from '../../../src/modules/user/domain/entities/user-role.entity';

const userRoleSeed: Pick<userRole, 'name'>[] = [
  {
    name: UserRoles.NORMAL,
  },
  {
    name: UserRoles.ADMIN,
  },
];

export default userRoleSeed;
