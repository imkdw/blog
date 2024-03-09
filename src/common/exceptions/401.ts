import { HttpException, HttpStatus } from '@nestjs/common';

export const UNAUTHORIZED_EXCEPTION_CODES = {
  INVALID_CRENENTIALS: '401001',
} as const;

class UnauthorizedException extends HttpException {
  constructor(errorCode: string, data?: string) {
    super({ errorCode, data }, HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidCredentialsException extends UnauthorizedException {
  constructor(data?: string) {
    super(UNAUTHORIZED_EXCEPTION_CODES.INVALID_CRENENTIALS, data);
  }
}
