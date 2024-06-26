import { HttpException, HttpStatus } from '@nestjs/common';

export const UNAUTHORIZED_EXCEPTION_CODES = {
  INVALID_CRENENTIAL: '401001',
  OAUTH_USER_SIGNIN_WITH_COMMON: '401002',
  OAUTH_FAILURE: '401003',
  INVALID_REFRESH_TOKEN: '401004',
  REFRESH_TOKEN_EXPIRED: '401005',
} as const;

class UnauthorizedException extends HttpException {
  constructor(errorCode: string, data?: string) {
    super({ errorCode, data }, HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidCredentialException extends UnauthorizedException {
  constructor(data?: string) {
    super(UNAUTHORIZED_EXCEPTION_CODES.INVALID_CRENENTIAL, data);
  }
}

export class OAuthUserSinginWithCommonException extends UnauthorizedException {
  constructor(data?: string) {
    super(UNAUTHORIZED_EXCEPTION_CODES.OAUTH_USER_SIGNIN_WITH_COMMON, data);
  }
}

export class OAuthFailureException extends UnauthorizedException {
  constructor(data?: string) {
    super(UNAUTHORIZED_EXCEPTION_CODES.OAUTH_FAILURE, data);
  }
}

export class InvalidRefreshTokenException extends UnauthorizedException {
  constructor(data?: string) {
    super(UNAUTHORIZED_EXCEPTION_CODES.INVALID_REFRESH_TOKEN, data);
  }
}

export class RefreshTokenExpiredException extends UnauthorizedException {
  constructor(data?: string) {
    super(UNAUTHORIZED_EXCEPTION_CODES.REFRESH_TOKEN_EXPIRED, data);
  }
}
