import { usersRole } from '@prisma/client';
import { UserRoles } from '../../../src/modules/user/domain/user.entity';

const userRoleSeed: Pick<usersRole, 'name'>[] = [
  {
    name: UserRoles.NORMAL,
  },
  {
    name: UserRoles.ADMIN,
  },
];

export default userRoleSeed;
