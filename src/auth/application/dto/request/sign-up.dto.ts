import { PickType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import IsPassword from '../../../decorators/is-password.decorator';
import IsNickname from '../../../decorators/is-nickname.decorator';
import User from '../../../../user/domain/user.entity';
import IsMatch from '../../../../decorators/is-match';

// eslint-disable-next-line import/prefer-default-export
export class RequestSignUpDto extends PickType(User, ['email', 'password', 'nickname']) {
  @IsString()
  email: string;

  @IsPassword()
  password: string;

  @IsPassword()
  @IsMatch('password')
  rePassword: string;

  @IsNickname()
  nickname: string;
}
