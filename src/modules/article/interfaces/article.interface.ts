import { articleCategory, articleComment, articleLike, articles } from '@prisma/client';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import Article from '../domain/entities/article.entity';
import { CreateArticleDto } from '../dto/internal/article.dto';
import {
  ResponseCreateArticleDto,
  ResponseGetArticleDetailDto,
  ResponseGetArticlesDto,
  ResponseGetArticleTagsDto,
} from '../dto/response/article.dto';
import { TX } from '../../../common/types/prisma';
import CreatingArticle from '../domain/models/creating-article.model';
import Tag from '../../tag/domain/entities/tag.entity';
import { ResponseCreateCommentDto, ResponseGetCommentsDto } from '../dto/response/article-comment.dto';
import { CreateCommentDto } from '../dto/internal/article-comment.dto';
import ArticleComment from '../domain/entities/article-comment.entity';
import ArticleCategory from '../domain/entities/article-category.entity';
import { ResponseToggleArticleLikeDto } from '../dto/response/article-like.dto';
import ArticleLike from '../domain/entities/article-like.entity';
import { IGetArticlesType } from '../enums/article.enum';

export const ArticleServiceKey = Symbol('ArticleService');
export interface IArticleService {
  createArticle(userId: string, dto: CreateArticleDto): Promise<Article>;
  createComment(userId: string, articleId: string, dto: CreateCommentDto): Promise<ArticleComment>;
  getArticleDetail(userId: string | undefined, articleId: string): Promise<ResponseGetArticleDetailDto>;
  getArticleTags(articleId: string): Promise<Tag[]>;
  getArticleCommentsWithUser(userId: string | undefined, articleId: string): Promise<ResponseGetCommentsDto>;
  getArticles(type: IGetArticlesType, getArticlesData: GetArticlesData): Promise<Article[]>;
  toggleArticleLike(userId: string, articleId: string): Promise<ResponseToggleArticleLikeDto>;
}

export const ArticleRepositoryKey = Symbol('ArticleRepository');
export interface IArticleRepository {
  save(article: CreatingArticle, tx: TX): Promise<Article>;
  findOne(dto: Partial<Article>, option: FindOption): Promise<Article | null>;
  findMany(dto: Partial<Article>, option: FindOption): Promise<Article[]>;
  findManyByIds(ids: string[], option: FindOption): Promise<Article[]>;
  findManyOrderByLikeCount(option: FindOption): Promise<Article[]>;
  findManyOrderByCreateAt(dto: Partial<Article>, option: FindOption): Promise<Article[]>;
  increaseCommentCount(articleId: string, tx: TX): Promise<void>;
  decreaseCommentCount(articleId: string, tx: TX): Promise<void>;
  increaseLikeCount(articleId: string, tx: TX): Promise<void>;
  decreaseLikeCount(articleId: string, tx: TX): Promise<void>;
}

export const ArticleMapperKey = Symbol('ArticleMapper');
export interface IArticleMapper {
  toArticle(_article: articles): Article;
  toArticleComment(_articleComment: articleComment): ArticleComment;
  toArticleCategory(data: articleCategory): ArticleCategory;
  toArticleLike(data: articleLike): ArticleLike;
  toResponseCreateArticleDto(article: Article): ResponseCreateArticleDto;
  toResponseGetArticleTagsDto(tags: Tag[]): ResponseGetArticleTagsDto;
  toResponseCreateCommentDto(comment: ArticleComment): ResponseCreateCommentDto;
  toResponseGetArticlesDto(articles: Article[]): ResponseGetArticlesDto;
}

export interface GetArticlesData {
  parent: string | null;
  child: string | null;
  articleId: string | null;
  limit: number | null;
}
