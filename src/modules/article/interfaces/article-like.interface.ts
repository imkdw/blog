import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import ArticleLikeEntity from '../entities/article-like/article-like.entity';

export const ArticleLikeServiceKey = Symbol('IArticleLikeService');
export interface IArticleLikeService {
  findOne(dto: Partial<ArticleLikeEntity>, option: FindOption): Promise<ArticleLikeEntity | null>;
  toggleLike(userId: string, articleId: string, tx: TX): Promise<{ isLiked: boolean }>;
}

export const ArticleLikeRepositoryKey = Symbol('IArticleLikeRepository');
export interface IArticleLikeRepository {
  findOne(dto: Partial<ArticleLikeEntity>, option: FindOption): Promise<ArticleLikeEntity | null>;
  save(data: ArticleLikeEntity, tx: TX): Promise<void>;
  delete(id: number, tx: TX): Promise<void>;
}
