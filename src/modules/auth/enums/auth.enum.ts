export const TokeyKey = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;
export type ITokeyKey = (typeof TokeyKey)[keyof typeof TokeyKey];
