import { HttpException, HttpStatus } from '@nestjs/common';

export const INTERNAL_SERVER_EXCEPTION_CODES = {
  CONVERT_STRING_TO_ENUM_EXCEPTION: '500001',
  AWS_S3_COPY_FILE_FAILURE: '500002',
} as const;

class InternalServerException extends HttpException {
  constructor(errorCode: string, data?: string) {
    super({ errorCode, data }, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

export class ConvertStringToEnumException extends InternalServerException {
  constructor(data?: string) {
    super(INTERNAL_SERVER_EXCEPTION_CODES.CONVERT_STRING_TO_ENUM_EXCEPTION, data);
  }
}

export class AwsS3CopyFileFailureException extends InternalServerException {
  constructor(data?: string) {
    super(INTERNAL_SERVER_EXCEPTION_CODES.AWS_S3_COPY_FILE_FAILURE, data);
  }
}
