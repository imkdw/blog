import { PickType } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

import User from '../../../../user/domain/user.entity';
import IsPassword from '../../../../../common/decorators/is-password.decorator';
import IsMatch from '../../../../../common/decorators/is-match.decorator';
import IsNickname from '../../../../../common/decorators/is-nickname.decorator';

export default class RequestSignUpDto extends PickType(User, ['email', 'password', 'nickname']) {
  @IsEmail()
  email: string;

  @IsPassword()
  password: string;

  @IsPassword()
  @IsMatch('password')
  rePassword: string;

  @IsNickname()
  nickname: string;
}
