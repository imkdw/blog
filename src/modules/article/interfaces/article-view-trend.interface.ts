import { FindOption } from '../../../common/interfaces/find-option.interface';
import ArticleViewTrend from '../domain/article-view-trend/article-view-trend.domain';
import CreateArticleViewTrend from '../domain/article-view-trend/create';

export const ArticleViewTrendRepositoryKey = Symbol('ArticleViewTrendRepository');
export interface IArticleViewTrendRepository {
  findLastOne(option: FindOption): Promise<ArticleViewTrend | null>;
  create(data: CreateArticleViewTrend): Promise<ArticleViewTrend>;
}
