import Article from '../../domain/entities/article.entity';

export interface CreateArticleDto extends Pick<Article, 'id' | 'title' | 'summary' | 'content'> {
  parentCategoryId: number;
  childCategoryId: number;
  tags: string[];
  images: string[];
}
