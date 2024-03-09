import { HttpException, HttpStatus } from '@nestjs/common';

export const UNAUTHORIZED_EXCEPTION_CODES = {
  CONVERT_STRING_TO_ENUM_EXCEPTION: '500001',
} as const;

class InternalServerException extends HttpException {
  constructor(errorCode: string, data?: string) {
    super({ errorCode, data }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class ConvertStringToEnumException extends InternalServerException {
  constructor(data?: string) {
    super(UNAUTHORIZED_EXCEPTION_CODES.CONVERT_STRING_TO_ENUM_EXCEPTION, data);
  }
}
