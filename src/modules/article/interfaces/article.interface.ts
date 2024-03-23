import { articleComment, articles } from '@prisma/client';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import Article from '../domain/entities/article.entity';
import { CreateArticleDto } from '../dto/internal/article.dto';
import {
  ResponseCreateArticleDto,
  ResponseGetArticleDetailDto,
  ResponseGetArticleTagsDto,
} from '../dto/response/article.dto';
import { TX } from '../../../common/types/prisma';
import CreatingArticle from '../domain/models/creating-article.model';
import Tag from '../../tag/domain/entities/tag.entity';
import { ResponseCreateCommentDto, ResponseGetCommentsDto } from '../dto/response/article-comment.dto';
import { CreateCommentDto } from '../dto/internal/article-comment.dto';
import ArticleComment from '../domain/entities/article-comment.entity';

export const ArticleServiceKey = Symbol('ArticleService');
export interface IArticleService {
  createArticle(userId: string, dto: CreateArticleDto): Promise<Article>;
  createComment(userId: string, articleId: string, dto: CreateCommentDto): Promise<ArticleComment>;
  getArticleDetail(articleId: string): Promise<Article>;
  getArticleTags(articleId: string): Promise<Tag[]>;
  getArticleCommentsWithUser(userId: string | undefined, articleId: string): Promise<ResponseGetCommentsDto>;
}

export const ArticleRepositoryKey = Symbol('ArticleRepository');
export interface IArticleRepository {
  save(article: CreatingArticle, tx: TX): Promise<Article>;
  findOne(dto: Partial<Article>, option: FindOption): Promise<Article | null>;
  increaseCommentCount(articleId: string, tx: TX): Promise<void>;
}

export const ArticleMapperKey = Symbol('ArticleMapper');
export interface IArticleMapper {
  toArticle(_article: articles): Article;
  toArticleComment(_articleComment: articleComment): ArticleComment;
  toResponseCreateArticleDto(article: Article): ResponseCreateArticleDto;
  toResponseGetArticleDetailDto(article: Article): ResponseGetArticleDetailDto;
  toResponseGetArticleTagsDto(tags: Tag[]): ResponseGetArticleTagsDto;
  toResponseCreateCommentDto(comment: ArticleComment): ResponseCreateCommentDto;
}
