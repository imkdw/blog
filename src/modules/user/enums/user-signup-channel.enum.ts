export const UserSignupChannels = {
  COMMON: 'COMMON',
  OAUTH: 'OAUTH',
} as const;
export type IUserSignupChannels = (typeof UserSignupChannels)[keyof typeof UserSignupChannels];
