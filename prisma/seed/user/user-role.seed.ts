import { userRole } from '@prisma/client';
import { UserRole } from '../../../src/modules/user/enums/user-role.enum';

const userRoleSeed: Pick<userRole, 'name'>[] = [
  {
    name: UserRole.NORMAL,
  },
  {
    name: UserRole.ADMIN,
  },
];

export default userRoleSeed;
