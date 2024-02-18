import { registerDecorator, ValidationOptions } from 'class-validator';

export default function IsArticleContent(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'isArticleContent',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(content: string) {
          /**
           * * 게시글 내용 유효성 규칙
           * 1. 100자 이상 60000만자 미만
           */
          return content.length >= 100 && content.length <= 60000;
        },
        defaultMessage() {
          return '게시글 내용은 100자 이상, 60000자 이하로 작성이 가능합니다.';
        },
      },
    });
  };
}
