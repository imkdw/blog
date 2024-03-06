import { faker } from '@faker-js/faker';

type GenerateType = 'valid' | 'invalid';

export const generatePassword = (type: GenerateType): string => {
  if (type === 'invalid') {
    return 'a'; // 잘못된 비밀번호 예시
  }

  // 비밀번호 구성 요소 정의
  const length = 20;
  const numbers = '0123456789';
  const symbols = '!@#$%^&*?_~';
  const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
  const upperCaseLetters = 'abcdefghijklmnopqrstuvwxyz';

  // 각 카테고리에서 최소 하나의 문자를 추가
  const passwordArray = [
    faker.helpers.arrayElement(symbols.split('')),
    faker.helpers.arrayElement(lowerCaseLetters.split('')),
    faker.helpers.arrayElement(numbers.split('')),
    faker.helpers.arrayElement(upperCaseLetters.split('')),
  ];

  // 나머지 부분은 랜덤으로 채워넣음
  const allChars = numbers + symbols + lowerCaseLetters + upperCaseLetters;
  while (passwordArray.length < length) {
    passwordArray.push(faker.helpers.arrayElement(allChars.split('')));
  }

  // 비밀번호 배열을 섞음
  const shuffledPasswordArray = faker.helpers.shuffle(passwordArray);

  // 최종 비밀번호 문자열로 합쳐서 반환함
  return shuffledPasswordArray.join('');
};

export const generateNickname = (type: GenerateType): string => {
  if (type === 'invalid') {
    return '!';
  }

  const MAX_NICKNAME_LENGTH = 12;
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < MAX_NICKNAME_LENGTH; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
