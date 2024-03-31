import { HttpException, HttpStatus } from '@nestjs/common';

export const BAD_REQUEST_EXCEPTION_CODES = {
  INVALID_ARTICLE_ID: '400001',
} as const;

class BadRequestException extends HttpException {
  constructor(errorCode: string, data?: string) {
    super({ errorCode, data }, HttpStatus.BAD_REQUEST);
  }
}

export class InvalidArticleIdException extends BadRequestException {
  constructor(data?: string) {
    super(BAD_REQUEST_EXCEPTION_CODES.INVALID_ARTICLE_ID, data);
  }
}
