import { Injectable } from '@nestjs/common';
import { articleCategory, articleComment, articleLike, articles } from '@prisma/client';

import { IArticleMapper } from '../interfaces/article.interface';
import Article from '../domain/entities/article.entity';
import {
  ResponseCreateArticleDto,
  ResponseGetArticlesDto,
  ResponseGetArticleTagsDto,
} from '../dto/response/article.dto';
import Tag from '../../tag/domain/entities/tag.entity';
import { ResponseCreateCommentDto } from '../dto/response/article-comment.dto';
import ArticleComment from '../domain/entities/article-comment.entity';
import ArticleCategory from '../domain/entities/article-category.entity';
import ArticleLike from '../domain/entities/article-like.entity';

@Injectable()
export default class ArticleMapper implements IArticleMapper {
  toResponseCreateArticleDto(article: Article): ResponseCreateArticleDto {
    return { articleId: article.id };
  }

  toArticle(_article: articles): Article {
    return new Article(_article);
  }

  toArticleComment(data: articleComment): ArticleComment {
    return new ArticleComment(data);
  }

  toArticleCategory(data: articleCategory): ArticleCategory {
    return new ArticleCategory(data);
  }

  toArticleLike(data: articleLike): ArticleLike {
    return new ArticleLike(data);
  }

  toResponseGetArticleTagsDto(tags: Tag[]): ResponseGetArticleTagsDto {
    const response = tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
    }));

    return { tags: response };
  }

  toResponseCreateCommentDto(comment: ArticleComment): ResponseCreateCommentDto {
    return { id: comment.id };
  }

  toResponseGetArticlesDto(data: Article[]): ResponseGetArticlesDto {
    const findArticles = data.map((d) => ({
      articleId: d.id,
      title: d.title,
      summary: d.summary,
      thumbnail: d.thumbnail,
      createdAt: d.createAt,
      viewCount: d.viewCount,
      likeCount: d.likeCount,
      commentCount: d.commentCount,
    }));

    return { articles: findArticles };
  }
}
