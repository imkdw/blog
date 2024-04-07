import { faker } from '@faker-js/faker';
import Article from '../../domain/entities/article.entity';

interface CreateArticleParams {
  userId: string;
  articleId: string;
  title?: string;
  content?: string;
  summary?: string;
  thumbnail?: string;
}
// eslint-disable-next-line import/prefer-default-export
export const createArticle = async ({ articleId, title, content, summary, userId, thumbnail }: CreateArticleParams) => {
  const createdArticle = await prisma.articles.create({
    data: {
      id: articleId,
      title: title ?? faker.lorem.word(),
      userId,
      summary: summary ?? faker.lorem.word(),
      content: content ?? faker.lorem.word(),
      thumbnail: thumbnail ?? faker.image.url(),
    },
  });

  return new Article(createdArticle);
};
