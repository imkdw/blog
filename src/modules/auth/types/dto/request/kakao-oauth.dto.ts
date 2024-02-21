import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class RequestKakaoOAuthDto {
  @ApiProperty({
    description: '카카오 OAuth 인증 코드',
    example: 'asjio12i3j2ojoisacnmoi3j12o312',
  })
  @IsString()
  code: string;

  @ApiProperty({
    description: '카카오 OAuth 리다이렉트 URI',
    example: 'http://localhost:3000/oauth/kakao',
  })
  @IsString()
  redirectUri: string;
}
