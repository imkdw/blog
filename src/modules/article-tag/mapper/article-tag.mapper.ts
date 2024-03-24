import { Injectable } from '@nestjs/common';
import { articleTag } from '@prisma/client';

import { IArticleTagMapper } from '../interfaces/article-tag.interface';
import ArticleTag from '../domain/entities/article-tag.entity';

@Injectable()
export default class ArticleTagMapper implements IArticleTagMapper {
  toArticleTag(data: articleTag): ArticleTag {
    return new ArticleTag(data);
  }
}
