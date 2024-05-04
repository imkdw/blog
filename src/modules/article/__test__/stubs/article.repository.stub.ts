/* eslint-disable @typescript-eslint/no-unused-vars */
import { FindOption } from '../../../../common/interfaces/find-option.interface';
import { TX } from '../../../../common/types/prisma';
import Article from '../../entities/article/article.entity';
import { IArticleRepository } from '../../interfaces/article.interface';

export default class ArticleRepositoryStub implements IArticleRepository {
  private memory: Article[] = [];

  async delete(articleId: string, tx: TX): Promise<void> {
    const index = this.memory.findIndex((article) => article.id === articleId);
    this.memory[index].deleteAt = new Date();
  }

  async findAll(option?: FindOption): Promise<Article[]> {
    const articles = this.memory;
    if (!option?.includeDeleted) {
      return articles.filter((article) => article.deleteAt === null);
    }

    return articles;
  }

  async findById(id: string, option?: FindOption): Promise<Article> {
    const article = this.memory.find((item) => item.id === id);
    if (!article) return null;
    if (!option?.includeDeleted && article.deleteAt) return null;

    return article;
  }

  async findManyByIds(ids: string[], option?: FindOption): Promise<Article[]> {
    const articles = this.memory.filter((article) => ids.includes(article.id));
    if (!option?.includeDeleted) {
      return articles.filter((article) => article.deleteAt === null);
    }

    return articles;
  }

  async findManyOrderByCreateAt(dto: Partial<Article>, option?: FindOption): Promise<Article[]> {
    const articles = this.memory.sort((a, b) => a.createAt.getTime() - b.createAt.getTime());
    if (!option?.includeDeleted) {
      return articles.filter((article) => article.deleteAt === null);
    }

    return articles;
  }

  async findManyOrderByLikeCount(option?: FindOption): Promise<Article[]> {
    const articles = this.memory.sort((a, b) => a.likeCount - b.likeCount);
    if (!option?.includeDeleted) {
      return articles.filter((article) => article.deleteAt === null);
    }

    return articles;
  }

  async save(article: Article, tx?: TX): Promise<Article> {
    this.memory.push(article);
    return article;
  }

  async update(articleId: string, data: Partial<Article>, tx?: TX): Promise<Article> {
    const index = this.memory.findIndex((article) => article.id === articleId);
    this.memory[index] = { ...this.memory[index], ...data };
    return this.memory[index];
  }

  reset() {
    this.memory = [];
  }
}
