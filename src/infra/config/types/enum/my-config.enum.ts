export const MyConfig = {
  JWT: 'jwt',
  BCRYPT: 'bcrypt',
  OAUTH: 'oauth',
  DOMAIN: 'domain',
} as const;
export type IMyConfig = (typeof MyConfig)[keyof typeof MyConfig];
