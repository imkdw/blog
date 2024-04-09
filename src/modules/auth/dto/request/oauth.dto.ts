import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString, IsUUID } from 'class-validator';
import User from '../../../user/domain/entities/user.entity';
import { IOAuthProviders, OAuthProviders } from '../../enums/auth.enum';

// eslint-disable-next-line import/prefer-default-export
export class RequestKakaoOAuthDto {
  @ApiProperty({
    description: '카카오 로그인시 리다이렉트 이후 발급된 code 값',
    example: 'asjio12i3j2ojoisacnmoi3j12o312',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: '카카오 로그인시 설정한 리다이렉트 URI',
    example: 'http://localhost:3000/oauth/kakao',
  })
  @IsString()
  redirectUri: string;
}

export class RequestGithubOAuthDto {
  @ApiProperty({
    description: '깃허브 로그인시 리다이렉트 이후 발급된 code 값',
    example: 'asjio12i3j2ojoisacnmoi3j12o312',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: '깃허브 로그인시 설정한 리다이렉트 URI',
    example: 'http://localhost:3000/oauth/github',
  })
  @IsString()
  redirectUri: string;
}

export class RequestOAuthSignupDto {
  @ApiProperty({ description: '이메일 주소' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'OAuth 제공사', enum: OAuthProviders })
  @IsEnum(OAuthProviders)
  provider: IOAuthProviders;

  @ApiProperty({ description: 'OAuth 인증시 발급한 토큰' })
  @IsUUID()
  token: string;
}

export class RequestOAuthSigninDto extends PickType(User, ['email']) {
  @ApiProperty({ description: '이메일', example: 'email@email.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'OAuth 제공자', example: OAuthProviders.GOOGLE, enum: OAuthProviders })
  @IsEnum(OAuthProviders)
  provider: IOAuthProviders;

  @ApiProperty({ description: 'OAuth 인증시 발급된 토큰', example: 'uuid' })
  @IsUUID()
  token: string;
}
