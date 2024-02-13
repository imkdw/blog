import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import RequestSignUpDto from '../types/dto/request/sign-up.dto';

export function commonSignUp(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiBody({ type: RequestSignUpDto }));
}

export function commonSignIn(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiBody({ type: RequestSignUpDto }));
}
