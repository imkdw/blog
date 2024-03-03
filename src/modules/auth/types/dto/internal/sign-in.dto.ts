import { IUserRoles } from '../../../../user/domain/user.entity';

export interface CommonSignInDto {
  email: string;
  password: string;
}

export interface SignInResult {
  email: string;
  nickname: string;
  profile: string;
  role: IUserRoles;
  accessToken: string;
  refreshToken: string;
}
