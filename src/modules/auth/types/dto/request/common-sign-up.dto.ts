import { PickType } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

import User from '../../../../user/domain/user.entity';
import IsPassword from '../../../../../common/decorators/is-password.decorator';
import IsNickname from '../../../../../common/decorators/is-nickname.decorator';

export default class RequestSignUpDto extends PickType(User, ['email', 'password', 'nickname']) {
  @IsEmail()
  email: string;

  @IsPassword()
  password: string;

  @IsNickname()
  nickname: string;
}
