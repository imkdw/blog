import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { RequestSignUpDto } from '../application/dto/request/sign-up.dto';

export function signUp(summary: string) {
  return applyDecorators(ApiOperation({ summary }), ApiBody({ type: RequestSignUpDto }));
}
