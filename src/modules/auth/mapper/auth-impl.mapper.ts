import { Injectable } from '@nestjs/common';
import { AuthMapper } from '../types/mapper/auth.mapper';
import { AuthResult } from '../types/dto/internal/auth-result.dto';
import User from '../../user/domain/user.entity';
import UserRole from '../../user/domain/user-role.entity';

@Injectable()
export default class AuthMapperImpl implements AuthMapper {
  toAuthResult(
    accessToken: string,
    refreshToken: string,
    user: Pick<User, 'email' | 'nickname' | 'profile'>,
    userRole: Pick<UserRole, 'name'>,
  ): AuthResult {
    return {
      accessToken,
      refreshToken,
      user: {
        email: user.email,
        nickname: user.nickname,
        profile: user.profile,
        role: userRole.name,
      },
    };
  }
}
