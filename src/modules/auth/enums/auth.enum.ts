export const TokeyKey = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
} as const;
export type ITokeyKey = (typeof TokeyKey)[keyof typeof TokeyKey];

export const OAuthProviders = {
  GITHUB: 'github',
  GOOGLE: 'google',
  KAKAO: 'kakao',
} as const;
export type IOAuthProviders = (typeof OAuthProviders)[keyof typeof OAuthProviders];
