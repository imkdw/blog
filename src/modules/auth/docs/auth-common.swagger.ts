import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiHeader, ApiOperation } from '@nestjs/swagger';
import RequestSignUpDto from '../types/dto/request/sign-up.dto';
import RequestSignInDto from '../types/dto/request/sign-in.dto';
import ResponseCommonSignUpDto from '../types/dto/response/sign-up.dto';
import ResponseCommonSignInDto from '../types/dto/response/sign-in.dto';

export function commonSignUp(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: RequestSignUpDto }),
    ApiHeader({
      name: 'set-cookie',
      description: 'set-cookie 헤더를 통해서 refresh 토큰을 설정',
    }),
    ApiCreatedResponse({
      type: ResponseCommonSignUpDto,
      headers: {
        'Set-Cookie': {
          description: 'set-cookie 헤더를 통해서 refresh 토큰을 설정',
        },
      },
    }),
  );
}

export function commonSignIn(summary: string) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiBody({ type: RequestSignInDto }),
    ApiCreatedResponse({
      type: ResponseCommonSignInDto,
      headers: {
        'Set-Cookie': {
          description: 'set-cookie 헤더를 통해서 refresh 토큰을 설정',
        },
      },
    }),
  );
}
