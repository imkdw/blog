import { TX } from '../../../../common/types/prisma';
import Article from '../../domain/article.entity';
import RequestCreateArticleDto from '../dto/request/create-article.dto';
import { CreateArticleResult } from '../internal/create-article.dto';

export const ArticleServiceSymbol = Symbol('ArticleService');
export interface ArticleService {
  createArticle(dto: RequestCreateArticleDto, userId: string): Promise<CreateArticleResult>;

  getArticleDetail(articleId: string): Promise<Article>;

  findById(articleId: string): Promise<Article | null>;

  checkArticleId(articleId: string): Promise<boolean>;

  findArticlesByParam(param: string): Promise<Article[]>;

  addArticleCommentCount(articleId: string, tx?: TX): Promise<void>;
}
