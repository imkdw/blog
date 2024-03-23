import { Injectable } from '@nestjs/common';
import { articleComment, articles } from '@prisma/client';

import { IArticleMapper } from '../interfaces/article.interface';
import Article from '../domain/entities/article.entity';
import {
  ResponseCreateArticleDto,
  ResponseGetArticleDetailDto,
  ResponseGetArticleTagsDto,
} from '../dto/response/article.dto';
import Tag from '../../tag/domain/entities/tag.entity';
import { ResponseCreateCommentDto } from '../dto/response/article-comment.dto';
import ArticleComment from '../domain/entities/article-comment.entity';

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

  toResponseGetArticleDetailDto(article: Article): ResponseGetArticleDetailDto {
    return {
      articleId: article.id,
      title: article.title,
      content: article.content,
      summary: article.summary,
      thumbnail: article.thumbnail,
      createdAt: article.createAt,
      viewCount: article.viewCount,
      likeCount: article.likeCount,
      commentCount: article.commentCount,
    };
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
}
