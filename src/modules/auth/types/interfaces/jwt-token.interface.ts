import { IUserRoles } from '../../../user/domain/user.entity';

export interface TokenPayload {
  userId: string;
  role: IUserRoles;
}
