import { usersRole } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

import BaseEntity from '../../../common/domain/base.entity';
import { IUserRoles, UserRoles } from './user.entity';

export default class UserRole extends BaseEntity implements usersRole {
  constructor(userRole: Partial<UserRole>) {
    super();
    Object.assign(this, userRole);
  }

  @ApiProperty({ description: '권한 수준 ID', example: 1 })
  readonly id: number;

  @ApiProperty({ description: '사용자 권한수준', example: UserRoles.NORMAL })
  readonly name: IUserRoles;
}
