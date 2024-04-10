import Article from '../domain/article/article.domain';
import {
  ResponseGetArticleDetailDto,
  ResponseGetArticlesDto,
  ResponseGetArticleTagsDto,
} from '../dto/response/article.dto';
import Tag from '../../tag/domain/tag.domain';
import ArticleLike from '../domain/article-like/article-like.domain';

export const toResponseGetArticleTagsDto = (tags: Tag[]): ResponseGetArticleTagsDto => {
  const response = tags.map((tag) => ({
    id: tag.id,
    name: tag.name,
  }));

  return { tags: response };
};

export const toResponseGetArticlesDto = (data: Article[]): ResponseGetArticlesDto => {
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
};

export const toResponseGetArticleDetailDto = (
  article: Article,
  articleLike: ArticleLike,
): ResponseGetArticleDetailDto => ({
  articleId: article.id,
  title: article.title,
  content: article.content,
  commentCount: article.commentCount,
  createdAt: article.createAt,
  summary: article.summary,
  thumbnail: article.thumbnail,
  viewCount: article.viewCount,
  like: {
    likeCount: article.likeCount,
    isLiked: !!articleLike,
  },
});
