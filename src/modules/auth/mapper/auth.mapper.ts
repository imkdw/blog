import { Injectable } from '@nestjs/common';
import { IAuthMapper } from '../interfaces/auth.interface';
import UserRole, { toIUserRoles } from '../../user/domain/entities/user-role.entity';
import User from '../../user/domain/entities/user.entity';
import { AuthResult } from '../dto/internal/auth-result.dto';
import { ResponseAuthResultDto } from '../dto/response/auth.dto';

@Injectable()
export default class AuthMapper implements IAuthMapper {
  toAuthResult(user: User, userRole: UserRole, accessToken: string, refreshToken: string): AuthResult {
    return {
      email: user.email,
      nickname: user.nickname,
      profile: user.profile,
      role: toIUserRoles(userRole.name),
      accessToken,
      refreshToken,
    };
  }

  toResponseAuthResultDto(authResult: AuthResult): ResponseAuthResultDto {
    return {
      email: authResult.email,
      nickname: authResult.nickname,
      profile: authResult.profile,
      role: authResult.role,
      accessToken: authResult.accessToken,
    };
  }
}
