import { Inject } from '@nestjs/common';
import {
  ArticleLikeRepositoryKey,
  IArticleLikeRepository,
  IArticleLikeService,
} from '../interfaces/article-like.interface';
import { TX } from '../../../common/types/prisma';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import ArticleLike, { ArticleLikeBuilder } from '../entities/article-like/article-like.entity';

export default class ArticleLikeService implements IArticleLikeService {
  constructor(@Inject(ArticleLikeRepositoryKey) private readonly articleLikeRepository: IArticleLikeRepository) {}

  async toggleLike(userId: string, articleId: string, tx: TX): Promise<{ isLiked: boolean }> {
    let isLiked: boolean;
    const existArticleLike = await this.articleLikeRepository.findByArticleAndUserId(
      { articleId, userId },
      { includeDeleted: false },
    );

    /**
     * 이미 좋아요를 누른 경우 : 좋아요를 취소
     * 좋아요를 누르지 않은 경우 : 좋아요를 누름처리
     */
    if (existArticleLike) {
      await this.articleLikeRepository.delete(existArticleLike.id, tx);
      isLiked = false;
    } else {
      const articleLike = new ArticleLikeBuilder().userId(userId).articleId(articleId).build();
      await this.articleLikeRepository.save(articleLike, tx);
      isLiked = true;
    }

    return { isLiked };
  }

  async findByArticleAndUserId(
    { articleId, userId }: { articleId: string; userId: string },
    option?: FindOption,
  ): Promise<ArticleLike> {
    const articleLike = await this.articleLikeRepository.findByArticleAndUserId({ articleId, userId }, option);
    return articleLike;
  }
}
