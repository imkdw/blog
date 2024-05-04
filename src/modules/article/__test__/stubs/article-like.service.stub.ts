/* eslint-disable @typescript-eslint/no-unused-vars */
import { FindOption } from '../../../../common/interfaces/find-option.interface';
import { TX } from '../../../../common/types/prisma';
import ArticleLike, { ArticleLikeBuilder } from '../../entities/article-like/article-like.entity';
import { IArticleLikeService } from '../../interfaces/article-like.interface';

export default class ArticleLikeServiceStub implements IArticleLikeService {
  async findByArticleAndUserId(
    { articleId, userId }: { articleId: string; userId: string },
    option?: FindOption,
  ): Promise<ArticleLike> {
    if (!userId) return null;
    if (articleId === '999' || userId === '999') return null;
    return new ArticleLikeBuilder().articleId(articleId).userId(userId).build();
  }

  async toggleLike(userId: string, articleId: string, tx: TX): Promise<{ isLiked: boolean }> {
    if (articleId === '999') return { isLiked: false };
    return { isLiked: true };
  }
}
