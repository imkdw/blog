import { usersSignUpChannel } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

import BaseEntity from '../../../common/domain/base.entity';
import { IUserSignUpChannels, UserSignUpChannels } from './user.entity';

export default class UserSignUpChannel extends BaseEntity implements usersSignUpChannel {
  constructor(userSignUpChannel: Partial<UserSignUpChannel>) {
    super();
    Object.assign(this, userSignUpChannel);
  }

  @ApiProperty({ description: '회원가입 경로 아이디', example: 1 })
  readonly id: number;

  @ApiProperty({ description: '회원가입 경로명', example: UserSignUpChannels })
  readonly name: IUserSignUpChannels;
}
