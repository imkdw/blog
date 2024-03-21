import { Injectable } from '@nestjs/common';
import { articles } from '@prisma/client';

import { IArticleMapper } from '../interfaces/article.interface';
import Article from '../domain/entities/article.entity';
import { ResponseCreateArticleDto } from '../dto/response/article.dto';

@Injectable()
export default class ArticleMapper implements IArticleMapper {
  toResponseCreateArticleDto(article: Article): ResponseCreateArticleDto {
    return { articleId: article.id };
  }

  toArticle(_article: articles): Article {
    return new Article(_article);
  }
}
