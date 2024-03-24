export const GetArticlesType = {
  category: 'category',
  popular: 'popular',
  recent: 'recent',
  recommended: 'recommended',
} as const;
export type IGetArticlesType = (typeof GetArticlesType)[keyof typeof GetArticlesType];
