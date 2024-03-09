import { HttpException, HttpStatus } from '@nestjs/common';

export const FORBIDDEN_EXCEPTION_CODES = {
  OAUTH_FAILURE_EXCEPTION: '403001',
} as const;

class ForbiddenException extends HttpException {
  constructor(errorCode: string, data?: string) {
    super({ errorCode, data }, HttpStatus.FORBIDDEN);
  }
}

export class OAuthFailureException extends ForbiddenException {
  constructor(data?: string) {
    super(FORBIDDEN_EXCEPTION_CODES.OAUTH_FAILURE_EXCEPTION, data);
  }
}
