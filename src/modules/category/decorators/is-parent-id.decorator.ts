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
        validate(parentId: number) {
          return parentId === null || parentId > 0;
        },
      },
    });
  };
}
