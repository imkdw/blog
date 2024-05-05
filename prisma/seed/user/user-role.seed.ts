import UserRole from '../../../src/modules/user/entities/user-role/user-role.entity';
import { UserRoles } from '../../../src/modules/user/enums/user-role.enum';

const userRoleSeed: Pick<UserRole, 'name'>[] = [
  {
    name: UserRoles.NORMAL,
  },
  {
    name: UserRoles.ADMIN,
  },
];

export default userRoleSeed;
