/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus } from '@nestjs/common';

// eslint-disable-next-line import/prefer-default-export
export const FORBIDDEN_EXCEPTION_CODES = {
  NOT_AUTHOR_OF_COMMENT: '403001',
} as const;

class ForbiddenException extends HttpException {
  constructor(errorCode: string, data?: unknown) {
    super({ errorCode, data }, HttpStatus.FORBIDDEN);
  }
}

export class NotAuthorOfCommentException extends ForbiddenException {
  constructor(data?: unknown) {
    super(FORBIDDEN_EXCEPTION_CODES.NOT_AUTHOR_OF_COMMENT, data);
  }
}
