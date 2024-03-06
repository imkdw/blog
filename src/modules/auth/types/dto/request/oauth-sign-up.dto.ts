import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsUUID } from 'class-validator';

import User from '../../../../user/domain/user.entity';
import { IOAuthProvider, OAuthProvider } from '../../../domain/ex-oauth-provider.entity';

export default class RequestOAuthSignUpDto extends PickType(User, ['email']) {
  @ApiProperty({ description: '이메일 주소' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'OAuth 제공사', enum: OAuthProvider })
  @IsEnum(OAuthProvider)
  provider: IOAuthProvider;

  @ApiProperty({ description: 'OAuth 인증시 발급한 토큰' })
  @IsUUID()
  token: string;
}
