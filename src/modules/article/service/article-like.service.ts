import { Inject } from '@nestjs/common';
import {
  ArticleLikeRepositoryKey,
  IArticleLikeRepository,
  IArticleLikeService,
} from '../interfaces/article-like.interface';
import { TX } from '../../../common/types/prisma';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import ArticleLike from '../domain/article-like/article-like.domain';
import CreateArticleLike from '../domain/article-like/create';

export default class ArticleLikeService implements IArticleLikeService {
  constructor(@Inject(ArticleLikeRepositoryKey) private readonly articleLikeRepository: IArticleLikeRepository) {}

  async findOne(dto: Partial<ArticleLike>, option: FindOption): Promise<ArticleLike | null> {
    const articleLike = this.articleLikeRepository.findOne(dto, option);
    return articleLike;
  }

  async toggleLike(userId: string, articleId: string, tx: TX): Promise<{ isLiked: boolean }> {
    let isLiked: boolean;
    const articleLike = await this.articleLikeRepository.findOne({ userId, articleId }, { includeDeleted: false });

    /**
     * 이미 좋아요를 누른 경우 : 좋아요를 취소
     * 좋아요를 누르지 않은 경우 : 좋아요를 누름처리
     */
    if (articleLike) {
      await this.articleLikeRepository.delete(articleLike.id, tx);
      isLiked = false;
    } else {
      const creatingArticleLike = new CreateArticleLike({ userId, articleId });
      await this.articleLikeRepository.save(creatingArticleLike, tx);
      isLiked = true;
    }

    return { isLiked };
  }
}
