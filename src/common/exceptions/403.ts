/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus } from '@nestjs/common';

// eslint-disable-next-line import/prefer-default-export
export const FORBIDDEN_EXCEPTION_CODES = {
  OAUTH_FAILURE_EXCEPTION: '403001',
} as const;

class ForbiddenException extends HttpException {
  constructor(errorCode: string, data?: string) {
    super({ errorCode, data }, HttpStatus.FORBIDDEN);
  }
}
