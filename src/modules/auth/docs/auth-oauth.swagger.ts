import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOperation } from '@nestjs/swagger';

export function googleOAuth(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiHeader({
      name: 'Authorization',
      description: '구글에서 전달한 access_token을 req.header.authorization에 담아서 요청',
    }),
  );
}

export function kakaoOAuth(summary: string) {
  return applyDecorators(ApiOperation({ summary }));
}

export function oAuthSignUp(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiHeader({
      name: 'Authorization',
      description: '구글에서 전달한 access_token을 req.header.authorization에 담아서 요청',
    }),
  );
}

export function oAuthSignIn(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiHeader({
      name: 'Authorization',
      description: '구글에서 전달한 access_token을 req.header.authorization에 담아서 요청',
    }),
  );
}
