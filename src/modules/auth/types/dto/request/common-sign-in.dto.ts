import { PickType } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

import User from '../../../../user/domain/user.entity';

export default class RequestSignInDto extends PickType(User, ['email', 'password']) {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
