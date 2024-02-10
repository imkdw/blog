import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export default function IsNickname(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isPassword',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(password: string, args: ValidationArguments) {
          /**
           * * 닉네임 유효성 규칙
           * 1. 닉네임은 2자이상, 12자 이하로 생성이 가능하다.
           * 2. 특수문자는 사용이 불가능하다.
           * 3. 공백은 입력이 불가능하다.
           * 4. 한글, 영문, 숫자 사용이 가능하다.
           */
          const regExp = /^[a-zA-Z0-9가-힣]{2,12}$/;
          return regExp.test(password);
        },
        defaultMessage(args: ValidationArguments) {
          return 'Invalid Nickname';
        },
      },
    });
  };
}
