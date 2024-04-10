import { userRole } from '@prisma/client';
import { UserRoles } from '../../../src/modules/user/enums/user-role.enum';

const userRoleSeed: Pick<userRole, 'name'>[] = [
  {
    name: UserRoles.NORMAL,
  },
  {
    name: UserRoles.ADMIN,
  },
];

export default userRoleSeed;
