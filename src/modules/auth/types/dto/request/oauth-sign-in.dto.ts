import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsUUID } from 'class-validator';

import User from '../../../../user/domain/user.entity';
import { IOAuthProvider, OAuthProvider } from '../../../domain/ex-oauth-provider.entity';

export default class RequestOAuthSignInDto extends PickType(User, ['email']) {
  @ApiProperty({ description: '이메일', example: 'email@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'OAuth 제공자', example: OAuthProvider.GOOGLE, enum: OAuthProvider })
  @IsEnum(OAuthProvider)
  provider: IOAuthProvider;

  @ApiProperty({ description: 'OAuth 인증시 발급된 토큰', example: 'uuid' })
  @IsUUID()
  token: string;
}
