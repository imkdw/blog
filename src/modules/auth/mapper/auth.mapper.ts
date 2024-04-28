import UserRole from '../../user/domain/user-role/user-role.domain';
import UserEntity from '../../user/entities/user.entity';
import { AuthResult } from '../dto/internal/auth-result.dto';
import { ResponseAuthResultDto } from '../dto/response/auth.dto';

export const toAuthResult = (
  user: UserEntity,
  userRole: UserRole,
  accessToken: string,
  refreshToken: string,
): AuthResult => ({
  email: user.email,
  nickname: user.nickname,
  profile: user.profile,
  role: userRole.name,
  accessToken,
  refreshToken,
});

export const toResponseAuthResultDto = (authResult: AuthResult): ResponseAuthResultDto => ({
  email: authResult.email,
  nickname: authResult.nickname,
  profile: authResult.profile,
  role: authResult.role,
  accessToken: authResult.accessToken,
});
