import { HttpException, HttpStatus } from '@nestjs/common';

export const NOT_FOUND_EXCEPTION_CODES = {
  USER_ROLE_NOT_FOUND: '404001',
  USER_SIGNUP_CHANNEL_NOT_FOUND: '404002',
  OAUTH_PROVIDER_NOT_FOUND: '404003',
  USER_NOT_FOUND: '404004',
} as const;

class NotFoundException extends HttpException {
  constructor(errorCode: string, data?: string) {
    super({ errorCode, data }, HttpStatus.NOT_FOUND);
  }
}

export class UserRoleNotFoundException extends NotFoundException {
  constructor(name?: string) {
    super(NOT_FOUND_EXCEPTION_CODES.USER_ROLE_NOT_FOUND, name);
  }
}

export class UserSignupChannelNotFoundException extends NotFoundException {
  constructor(name?: string) {
    super(NOT_FOUND_EXCEPTION_CODES.USER_SIGNUP_CHANNEL_NOT_FOUND, name);
  }
}

export class OAuthProviderNotFoundException extends NotFoundException {
  constructor(name?: string) {
    super(NOT_FOUND_EXCEPTION_CODES.OAUTH_PROVIDER_NOT_FOUND, name);
  }
}

export class UserNotFoundException extends NotFoundException {
  constructor(userId?: string) {
    super(NOT_FOUND_EXCEPTION_CODES.USER_NOT_FOUND, userId);
  }
}
