import { PickType } from '@nestjs/swagger';
import ArticleTag from './article-tag.domain';

export default class CreateArticleTag extends PickType(ArticleTag, ['tagId', 'articleId', 'sort']) {
  constructor(data: CreateArticleTag) {
    super();
    this.tagId = data.tagId;
    this.articleId = data.articleId;
    this.sort = data.sort;
  }
}
