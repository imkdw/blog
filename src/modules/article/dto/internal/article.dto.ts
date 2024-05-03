import ArticleEntity from '../../entities/article/article.entity';

export interface CreateArticleDto extends Pick<ArticleEntity, 'id' | 'title' | 'summary' | 'content' | 'thumbnail'> {
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
