import { PickType } from '@nestjs/swagger';
import ArticleCategory from './article-category.domain';

export default class CreateArticleCategory extends PickType(ArticleCategory, ['articleId', 'categoryId']) {
  constructor(data: CreateArticleCategory) {
    super(data);
    this.articleId = data.articleId;
    this.categoryId = data.categoryId;
  }
}
