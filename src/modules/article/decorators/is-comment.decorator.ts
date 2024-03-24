import { registerDecorator, ValidationOptions } from 'class-validator';

export default function IsArticleComment(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'isArticleComment',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(password: string) {
          if (!password) return false;
          /**
           * * 게시글 댓글 유효성 규칙
           * 1. 최소 1글자에서 최대 1000글자까지 가능하다
           */
          return password.length >= 1 && password.length <= 1000;
        },
        defaultMessage() {
          return '게시글 댓글은 1~1000자 사이로 입력이 가능합니다';
        },
      },
    });
  };
}
