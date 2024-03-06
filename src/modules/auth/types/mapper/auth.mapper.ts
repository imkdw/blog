import UserRole from '../../../user/domain/user-role.entity';
import User from '../../../user/domain/user.entity';
import { AuthResult } from '../dto/internal/auth-result.dto';

export const AuthMapperSymbol = Symbol('AuthMapper');

export interface AuthMapper {
  toAuthResult(
    accessToken: string,
    refreshToken: string,
    user: Pick<User, 'email' | 'nickname' | 'profile'>,
    userRole: Pick<UserRole, 'name'>,
  ): AuthResult;
}
