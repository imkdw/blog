import Article from '../../domain/article/article.domain';

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
  thumbnail: string;
  newImages: string[];
}
