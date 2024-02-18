import { registerDecorator, ValidationOptions } from 'class-validator';

export default function IsArticleTitle(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'isArticleTitle',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(title: string) {
          /**
           * * 게시글 제목 유효성 규칙
           * 1. 5자 이상, 100자 이하
           */
          return title.length >= 5 && title.length <= 100;
        },
        defaultMessage() {
          return '게시글 제목은 5자 이상, 100자 이하로 작성이 가능합니다.';
        },
      },
    });
  };
}
