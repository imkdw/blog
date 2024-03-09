import UserRole from '../../user/domain/entities/user-role.entity';
import User from '../../user/domain/entities/user.entity';
import { AuthResult } from '../dto/internal/auth-result.dto';
import { ResponseAuthResultDto } from '../dto/response/auth.dto';

export const AuthMapperKey = Symbol('AuthMapper');
export interface IAuthMapper {
  toAuthResult(user: User, userRole: UserRole, accessToken: string, refreshToken: string): AuthResult;

  toResponseAuthResultDto(authResult: AuthResult): ResponseAuthResultDto;
}
