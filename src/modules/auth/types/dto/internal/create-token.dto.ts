import { IUserRoles } from '../../../../user/domain/user.entity';

export interface CreateJwtTokenDto {
  userId: string;
  role: IUserRoles;
  tokenType: 'access' | 'refresh';
}
