export const CheckDuplicateType = {
  EMAIL: 'email',
  NICKNAME: 'nickname',
} as const;
export type ICheckDuplicateType = (typeof CheckDuplicateType)[keyof typeof CheckDuplicateType];
