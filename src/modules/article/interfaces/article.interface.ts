import { articles } from '@prisma/client';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import Article from '../domain/entities/article.entity';
import { CreateArticleDto } from '../dto/internal/article.dto';
import { ResponseCreateArticleDto } from '../dto/response/article.dto';
import { TX } from '../../../common/types/prisma';
import CreatingArticle from '../domain/models/creating-article.model';

export const ArticleServiceKey = Symbol('ArticleService');
export interface IArticleService {
  createArticle(userId: string, dto: CreateArticleDto): Promise<Article>;
}

export const ArticleRepositoryKey = Symbol('ArticleRepository');
export interface IArticleRepository {
  save(article: CreatingArticle, tx: TX): Promise<Article>;
  findOne(dto: Partial<Article>, option: FindOption): Promise<Article | null>;
}

export const ArticleMapperKey = Symbol('ArticleMapper');
export interface IArticleMapper {
  toResponseCreateArticleDto(article: Article): ResponseCreateArticleDto;
  toArticle(_article: articles): Article;
}
