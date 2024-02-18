import { registerDecorator, ValidationOptions } from 'class-validator';

export default function IsArticleSummary(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'isArticleSummary',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(summary: string) {
          /**
           * * 게시글 요약 유효성 규칙
           * 1. 10자 이상, 200자 이하
           */
          return summary.length >= 50 && summary.length <= 200;
        },
        defaultMessage() {
          return '게시글 요약은 50자 이상, 200자 이하로 작성이 가능합니다.';
        },
      },
    });
  };
}
