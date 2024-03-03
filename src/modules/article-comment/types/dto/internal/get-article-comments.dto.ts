export interface GetArticleCommentsResult {
  id: number;
  content: string;
  createAt: Date;
  user: {
    profile: string;
    nickname: string;
    isWriter: boolean;
  };
}
