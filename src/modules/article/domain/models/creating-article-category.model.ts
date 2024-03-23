import { PickType } from '@nestjs/swagger';
import ArticleCategory from '../entities/article-category.entity';

export default class CreatingArticleCategory extends PickType(ArticleCategory, ['articleId', 'categoryId']) {
  constructor(data: CreatingArticleCategory) {
    super(data);
    this.articleId = data.articleId;
    this.categoryId = data.categoryId;
  }
}
