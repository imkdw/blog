import { registerDecorator, ValidationOptions } from 'class-validator';

export default function IsPassword(validationOptions?: ValidationOptions) {
  return (object: unknown, propertyName: string) => {
    registerDecorator({
      name: 'isPassword',
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        validate(password: string) {
          /**
           * * 비밀번호 유효성 규칙
           * 1. 비밀번호는 10자이상, 30자 이하로 생성이 가능하다.
           * 2. 최소 1개 이상의 영어 대문자를 포함한다.
           * 3. 최소 1개 이상의 영어 소문자를 포함한다.
           * 4. 최소 1개 이상의 숫자를 포함한다.
           * 5. 최소 1개 이상의 특수문자를 포함한다.
           * 6. 공백은 입력이 불가능하다.
           */
          const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{10,30}$/;
          return regExp.test(password);
        },
      },
    });
  };
}
