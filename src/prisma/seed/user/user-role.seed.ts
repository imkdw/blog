import UserRole from '../../../modules/user/entities/user-role/user-role.entity';
import { UserRoles } from '../../../modules/user/enums/user-role.enum';

const userRoleSeed: Pick<UserRole, 'name'>[] = [
  {
    name: UserRoles.NORMAL,
  },
  {
    name: UserRoles.ADMIN,
  },
];

export default userRoleSeed;
