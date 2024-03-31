import Article from '../../domain/entities/article.entity';

export interface CreateArticleDto extends Pick<Article, 'id' | 'title' | 'summary' | 'content' | 'thumbnail'> {
  parentCategoryId: number;
  childCategoryId: number;
  tags: string[];
  images: string[];
}

export interface UpdateArticleDto {
  title: string;
  summary: string;
  content: string;
  newImages: string[];
}
