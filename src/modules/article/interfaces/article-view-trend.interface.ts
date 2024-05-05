import { FindOption } from '../../../common/interfaces/find-option.interface';
import ArticleViewTrend from '../entities/article-view-trend/article-view-trend.entity';

export const ArticleViewTrendRepositoryKey = Symbol('ArticleViewTrendRepository');
export interface IArticleViewTrendRepository {
  findLast(option?: FindOption): Promise<ArticleViewTrend | null>;
  save(data: ArticleViewTrend): Promise<ArticleViewTrend>;
  findAll(option?:FindOption): Promise<ArticleViewTrend[]>;
}
