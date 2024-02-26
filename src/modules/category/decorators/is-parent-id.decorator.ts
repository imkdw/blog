import { registerDecorator, ValidationOptions } from 'class-validator';

export default function IsParentId(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'isParentId',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(parentId: unknown) {
          if (parentId === null) {
            return true;
          }

          const result = parseInt(parentId as string, 10);
          if (Number.isNaN(result)) {
            return false;
          }

          return true;
        },
        defaultMessage() {
          return '부모 카테고리 아이디는 null 또는 숫자만 가능합니다';
        },
      },
    });
  };
}
