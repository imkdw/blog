import { HttpException, HttpStatus } from '@nestjs/common';

export const NOT_FOUND_EXCEPTION_CODES = {
  USER_ROLE_NOT_FOUND: '404001',
  USER_SIGNUP_CHANNEL_NOT_FOUND: '404002',
  OAUTH_PROVIDER_NOT_FOUND: '404003',
  USER_NOT_FOUND: '404004',
  CATEGORY_NOT_FOUND: '404005',
  ARTICLE_NOT_FOUND: '404006',
  ARTICLE_COMMENT_NOT_FOUND: '404007',
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

export class CategoryNotFoundException extends NotFoundException {
  constructor(categoryId?: string) {
    super(NOT_FOUND_EXCEPTION_CODES.CATEGORY_NOT_FOUND, categoryId);
  }
}

export class ArticleNotFoundException extends NotFoundException {
  constructor(articleId?: string) {
    super(NOT_FOUND_EXCEPTION_CODES.ARTICLE_NOT_FOUND, articleId);
  }
}

export class ArticleCommentNotFoundException extends NotFoundException {
  constructor(commentId?: string) {
    super(NOT_FOUND_EXCEPTION_CODES.ARTICLE_COMMENT_NOT_FOUND, commentId);
  }
}
