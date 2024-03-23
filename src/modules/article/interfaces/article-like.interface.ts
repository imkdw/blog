import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import ArticleLike from '../domain/entities/article-like.entity';
import CreatingArticleLike from '../domain/models/creating-article-like.model';

export const ArticleLikeServiceKey = Symbol('IArticleLikeService');
export interface IArticleLikeService {
  findOne(dto: Partial<ArticleLike>, option: FindOption): Promise<ArticleLike | null>;
  toggleLike(userId: string, articleId: string, tx: TX): Promise<{ isLiked: boolean }>;
}

export const ArticleLikeRepositoryKey = Symbol('IArticleLikeRepository');
export interface IArticleLikeRepository {
  findOne(dto: Partial<ArticleLike>, option: FindOption): Promise<ArticleLike | null>;
  save(data: CreatingArticleLike, tx: TX): Promise<void>;
  delete(id: number, tx: TX): Promise<void>;
}
