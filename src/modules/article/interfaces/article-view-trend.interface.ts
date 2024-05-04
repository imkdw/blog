import { FindOption } from '../../../common/interfaces/find-option.interface';
import ArticleViewTrendEntity from '../entities/article-view-trend/article-view-trend.entity';

export const ArticleViewTrendRepositoryKey = Symbol('ArticleViewTrendRepository');
export interface IArticleViewTrendRepository {
  findLastOne(option: FindOption): Promise<ArticleViewTrendEntity | null>;
  create(data: ArticleViewTrendEntity): Promise<ArticleViewTrendEntity>;
}
