import { applyDecorators } from '@nestjs/common';
import { ApiHeader, ApiOperation } from '@nestjs/swagger';

export const googleOAuth = (summary: string) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiHeader({
      name: 'Authorization',
      description: '구글에서 전달한 access_token을 req.header.authorization에 담아서 요청',
    }),
  );

export const kakaoOAuth = (summary: string) => applyDecorators(ApiOperation({ summary }));

export const githubOAuth = (summary: string) => applyDecorators(ApiOperation({ summary }));

export const oAuthSingup = (summary: string) => applyDecorators(ApiOperation({ summary }));

export const oAuthSignin = (summary: string) => applyDecorators(ApiOperation({ summary }));
