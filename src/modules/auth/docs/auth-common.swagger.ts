import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { RequestCommonSigninDto } from '../dto/request/auth-common.dto';
import { ResponseAuthResultDto } from '../dto/response/auth.dto';
import { UNAUTHORIZED_EXCEPTION_CODES } from '../../../common/exceptions/401';
import { REFRESH_TOKEN_KEY } from '../constants/auth.constants';

// eslint-disable-next-line import/prefer-default-export
export const signin = (summary: string) =>
  applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: RequestCommonSigninDto }),
    ApiCreatedResponse({
      type: ResponseAuthResultDto,
      description: '로그인 성공',
      headers: {
        'Set-Cookie': {
          description: '리프레쉬 토큰 쿠키설정',
          schema: {
            example: `${REFRESH_TOKEN_KEY}="someJwtRefreshToken" httpOnly path=/ secure`,
          },
        },
      },
    }),
    ApiConflictResponse({
      description: `
    ${UNAUTHORIZED_EXCEPTION_CODES.INVALID_CRENENTIAL} : 존재하지 않는 이메일이거나 비밀번호가 일치하지 않는경우
    ${UNAUTHORIZED_EXCEPTION_CODES.OAUTH_USER_SIGNIN_WITH_COMMON} : 소셜로그인으로 가입한 유저가 일반로그인을 시도했을경우
    `,
    }),
  );
