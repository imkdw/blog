import { HttpException, HttpStatus } from '@nestjs/common';

// eslint-disable-next-line import/prefer-default-export
export const BAD_REQUEST_EXCEPTION_CODES = {
  INVALID_ARTICLE_ID: '400001',
} as const;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class BadRequestException extends HttpException {
  constructor(errorCode: string, data?: string) {
    super({ errorCode, data }, HttpStatus.BAD_REQUEST);
  }
}
