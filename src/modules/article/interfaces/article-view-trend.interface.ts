import { FindOption } from '../../../common/interfaces/find-option.interface';
import ResponseGetArticleViewTrendDto from '../dto/response/get-article-view-trend.dto';
import ArticleViewTrend from '../entities/article-view-trend/article-view-trend.entity';

export const ArticleTrendServiceKey = Symbol('ArticleTrendService');
export interface IArticleTrendService {
  getArticleViewTrends(duration: number): Promise<ResponseGetArticleViewTrendDto>;
}

export const ArticleViewTrendRepositoryKey = Symbol('ArticleViewTrendRepository');
export interface IArticleViewTrendRepository {
  findLast(option?: FindOption): Promise<ArticleViewTrend | null>;
  save(data: ArticleViewTrend): Promise<ArticleViewTrend>;
  findAll(option?: FindOption): Promise<ArticleViewTrend[]>;
  findManyByDateRange(start: Date, end: Date, option?: FindOption): Promise<ArticleViewTrend[]>;
}
