import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsString, IsUUID } from 'class-validator';
import { IOAuthProvider, OAuthProvider } from '../../../domain/ex-oauth-provider.entity';

export default class ReponseOAuthDto {
  @ApiProperty({ description: '기존 가입유저 유무' })
  @IsBoolean()
  isExist: boolean;

  @ApiProperty({ description: '소셜로그인 요청된 이메일' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: '소셜로그인 요청된 OAuth 프로바이더', enum: OAuthProvider })
  @IsString()
  provider: IOAuthProvider;

  @ApiProperty({ description: '소셜로그인 요청된 OAuth 데이터의 토큰값' })
  @IsUUID()
  token: string;
}
