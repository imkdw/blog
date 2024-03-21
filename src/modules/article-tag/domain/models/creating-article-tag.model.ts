import { PickType } from '@nestjs/swagger';
import ArticleTag from '../entities/article-tag.entity';

export default class CreatingArticleTag extends PickType(ArticleTag, ['tagId', 'articleId', 'sort']) {
  constructor(_articleTag: CreatingArticleTag) {
    super(_articleTag);
    this.tagId = _articleTag.tagId;
    this.articleId = _articleTag.articleId;
    this.sort = _articleTag.sort;
  }
}
