import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import ArticleLike from '../entities/article-like/article-like.entity';

export const ArticleLikeServiceKey = Symbol('IArticleLikeService');
export interface IArticleLikeService {
  toggleLike(userId: string, articleId: string, tx: TX): Promise<{ isLiked: boolean }>;
  findByArticleAndUserId(
    { articleId, userId }: { articleId: string; userId: string },
    option?: FindOption,
  ): Promise<ArticleLike | null>;
}

export const ArticleLikeRepositoryKey = Symbol('IArticleLikeRepository');
export interface IArticleLikeRepository {
  save(data: ArticleLike, tx: TX): Promise<void>;
  delete(id: number, tx: TX): Promise<void>;
  findByArticleAndUserId(
    { articleId, userId }: { articleId: string; userId: string },
    option?: FindOption,
  ): Promise<ArticleLike | null>;
}
