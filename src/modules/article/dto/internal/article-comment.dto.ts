export interface CreateCommentDto {
  content: string;
}

export interface UpdateCommentDto {
  articleId: string;
  commentId: number;
  content: string;
}

export interface DeleteCommentDto {
  articleId: string;
  commentId: number;
}
