import RequestCreateArticleDto from '../dto/request/create-article.dto';
import { CreateArticleResult } from '../internal/create-article.dto';

export const ArticleServiceSymbol = Symbol('ArticleService');
export interface ArticleService {
  createArticle(dto: RequestCreateArticleDto, userId: string): Promise<CreateArticleResult>;
}
