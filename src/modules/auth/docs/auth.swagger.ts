import { applyDecorators } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { ResponseRefreshTokenDto } from '../dto/response/auth.dto';
import { UNAUTHORIZED_EXCEPTION_CODES } from '../../../common/exceptions/401';

// eslint-disable-next-line import/prefer-default-export
export const refreshToken = (summary: string) =>
  applyDecorators(
    ApiOperation({
      summary,
      description: `
        API 요청시 전달받은 쿠키에서 refreshToken을 추출해서 새로운 accessToken을 발급합니다.
        isSuccess값을 통해 토큰 갱신의 성공여부도 반환합니다.
      `,
    }),
    ApiCreatedResponse({
      description: '토큰 재발급 성공',
      type: ResponseRefreshTokenDto,
      headers: {
        'Set-Cookie': { description: '발급된 accessToken을 set-cookie 헤더를 통해 전달합니다.' },
      },
    }),
    ApiUnauthorizedResponse({
      description: `
      ${UNAUTHORIZED_EXCEPTION_CODES.REFRESH_TOKEN_EXPIRED} : refreshToken이 만료된경우 발생
      `,
    }),
  );
