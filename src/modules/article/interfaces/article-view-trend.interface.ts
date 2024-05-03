import { FindOption } from '../../../common/interfaces/find-option.interface';
import ArticleViewTrend from '../entities/article-view-trend/article-view-trend.entity';
import CreateArticleViewTrend from '../entities/article-view-trend/create';

export const ArticleViewTrendRepositoryKey = Symbol('ArticleViewTrendRepository');
export interface IArticleViewTrendRepository {
  findLastOne(option: FindOption): Promise<ArticleViewTrend | null>;
  create(data: CreateArticleViewTrend): Promise<ArticleViewTrend>;
}
