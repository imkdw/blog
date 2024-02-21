import { ApiProperty } from '@nestjs/swagger';
import { usersOAuth } from '@prisma/client';
import BaseEntity from '../../../common/domain/base.entity';

export default class UserOAuth extends BaseEntity implements usersOAuth {
  constructor(_userOAuth: Partial<UserOAuth>) {
    super();
    Object.assign(this, _userOAuth);
  }

  @ApiProperty({ description: '고유 ID', example: 'hash' })
  userId: string;

  @ApiProperty({ description: '인증 제공자 아이디', example: 1 })
  providerId: number;
}
