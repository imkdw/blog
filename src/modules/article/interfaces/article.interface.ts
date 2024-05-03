import { FindOption } from '../../../common/interfaces/find-option.interface';
import { CreateArticleDto, UpdateArticleDto } from '../dto/internal/article.dto';
import { ResponseGetArticleDetailDto } from '../dto/response/article.dto';
import { TX } from '../../../common/types/prisma';
import { ResponseGetCommentsDto } from '../dto/response/article-comment.dto';
import { CreateCommentDto } from '../dto/internal/article-comment.dto';
import ArticleComment from '../entities/article-comment/article-comment.entity';
import { ResponseToggleArticleLikeDto } from '../dto/response/article-like.dto';
import { IGetArticlesType } from '../enums/article.enum';
import TagEntity from '../../tag/entities/tag.entity';
import ArticleEntity from '../entities/article/article.entity';
import ArticleCreateEntity from '../entities/article/article-create.entity';

export const ArticleServiceKey = Symbol('ArticleService');
export interface IArticleService {
  createArticle(userId: string, dto: CreateArticleDto): Promise<ArticleEntity>;
  updateArticle(articleId: string, dto: UpdateArticleDto): Promise<void>;
  createComment(userId: string, articleId: string, dto: CreateCommentDto): Promise<ArticleComment>;
  deleteArticle(articleId: string): Promise<void>;
  getArticleDetail(userId: string | undefined, articleId: string): Promise<ResponseGetArticleDetailDto>;
  getArticleTags(articleId: string): Promise<TagEntity[]>;
  getArticleCommentsWithUser(userId: string | undefined, articleId: string): Promise<ResponseGetCommentsDto>;
  getArticles(type: IGetArticlesType, getArticlesData: GetArticlesData): Promise<ArticleEntity[]>;
  toggleArticleLike(userId: string, articleId: string): Promise<ResponseToggleArticleLikeDto>;
  increaseViewCount(articleId: string): Promise<number>;
  getArticleIds(): Promise<string[]>;
}

export const ArticleRepositoryKey = Symbol('ArticleRepository');
export interface IArticleRepository {
  save(article: ArticleCreateEntity, tx: TX): Promise<ArticleEntity>;
  delete(articleId: string, tx: TX): Promise<void>;
  update(articleId: string, data: Partial<ArticleEntity>, tx?: TX): Promise<ArticleEntity>;
  findManyByIds(ids: string[], option?: FindOption): Promise<ArticleEntity[]>;
  findManyOrderByLikeCount(option?: FindOption): Promise<ArticleEntity[]>;
  findManyOrderByCreateAt(dto: Partial<ArticleEntity>, option?: FindOption): Promise<ArticleEntity[]>;
  findById(id: string, option?: FindOption): Promise<ArticleEntity | null>;
  findAll(option?: FindOption): Promise<ArticleEntity[]>;
}

export const ArticleSchedulerKey = Symbol('ArticleScheduler');
export interface IArticleScheduler {
  createArticleViewTrend(): Promise<void>;
}

export interface GetArticlesData {
  parent: string | null;
  child: string | null;
  articleId: string | null;
  limit: number | null;
}
