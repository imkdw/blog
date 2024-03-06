import { IUserRoles } from '../../../../user/domain/user.entity';

export interface AuthResult {
  accessToken: string;
  refreshToken: string;
  user: {
    email: string;
    nickname: string;
    profile: string;
    role: IUserRoles;
  };
}
