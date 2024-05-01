import { FindOption } from '../../../common/interfaces/find-option.interface';
import Article from '../domain/article/article.domain';
import { CreateArticleDto, UpdateArticleDto } from '../dto/internal/article.dto';
import { ResponseGetArticleDetailDto } from '../dto/response/article.dto';
import { TX } from '../../../common/types/prisma';
import { ResponseGetCommentsDto } from '../dto/response/article-comment.dto';
import { CreateCommentDto } from '../dto/internal/article-comment.dto';
import ArticleComment from '../domain/article-comment/article-comment.domain';
import { ResponseToggleArticleLikeDto } from '../dto/response/article-like.dto';
import { IGetArticlesType } from '../enums/article.enum';
import CreateArticle from '../domain/article/create';
import TagEntity from '../../tag/entities/tag.entity';

export const ArticleServiceKey = Symbol('ArticleService');
export interface IArticleService {
  createArticle(userId: string, dto: CreateArticleDto): Promise<Article>;
  updateArticle(articleId: string, dto: UpdateArticleDto): Promise<void>;
  createComment(userId: string, articleId: string, dto: CreateCommentDto): Promise<ArticleComment>;
  deleteArticle(articleId: string): Promise<void>;
  getArticleDetail(userId: string | undefined, articleId: string): Promise<ResponseGetArticleDetailDto>;
  getArticleTags(articleId: string): Promise<TagEntity[]>;
  getArticleCommentsWithUser(userId: string | undefined, articleId: string): Promise<ResponseGetCommentsDto>;
  getArticles(type: IGetArticlesType, getArticlesData: GetArticlesData): Promise<Article[]>;
  toggleArticleLike(userId: string, articleId: string): Promise<ResponseToggleArticleLikeDto>;
  increaseViewCount(articleId: string): Promise<number>;
  getArticleIds(): Promise<string[]>;
}

export const ArticleRepositoryKey = Symbol('ArticleRepository');
export interface IArticleRepository {
  save(article: CreateArticle, tx: TX): Promise<Article>;
  delete(articleId: string, tx: TX): Promise<void>;
  update(articleId: string, data: Partial<Article>, tx?: TX): Promise<Article>;
  findOne(dto: Partial<Article>, option: FindOption): Promise<Article | null>;
  findMany(dto: Partial<Article>, option: FindOption): Promise<Article[]>;
  findManyByIds(ids: string[], option: FindOption): Promise<Article[]>;
  findManyOrderByLikeCount(option: FindOption): Promise<Article[]>;
  findManyOrderByCreateAt(dto: Partial<Article>, option: FindOption): Promise<Article[]>;
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
