export const CookieMaxage = {
  DAY_1: 1 * 24 * 60 * 60 * 1000,
  DAY_30: 30 * 24 * 60 * 60 * 1000,
} as const;
export type ICookieMaxage = (typeof CookieMaxage)[keyof typeof CookieMaxage];
