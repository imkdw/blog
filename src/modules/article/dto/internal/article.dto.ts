import Article from '../../domain/entities/article.entity';

export interface CreateArticleDto extends Pick<Article, 'id' | 'title' | 'summary' | 'content' | 'thumbnail'> {
  parentCategoryId: number;
  childCategoryId: number;
  tags: string[];
}
