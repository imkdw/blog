import { Inject, Injectable } from '@nestjs/common';
import {
  ArticleCategoryRepositoryKey,
  IArticleCategoryRepository,
  IArticleCategoryService,
} from '../interfaces/article-category.interface';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import ArticleCategory from '../domain/article-category/article-category.domain';
import { TX } from '../../../common/types/prisma';
import CreateArticleCategory from '../domain/article-category/create';

@Injectable()
export default class ArticleCategoryService implements IArticleCategoryService {
  constructor(
    @Inject(ArticleCategoryRepositoryKey) private readonly articleCategoryRepository: IArticleCategoryRepository,
  ) {}

  async create(articleId: string, categoryId: number, tx: TX): Promise<void> {
    const creatingArticleCategory = new CreateArticleCategory({ articleId, categoryId });
    await this.articleCategoryRepository.save(creatingArticleCategory, tx);
  }

  async findMany(dto: Partial<ArticleCategory>, option: FindOption): Promise<ArticleCategory[]> {
    const articleCategories = await this.articleCategoryRepository.findMany(dto, option);
    return articleCategories;
  }

  async deleteMany(dto: Partial<ArticleCategory>, tx: TX): Promise<void> {
    await this.articleCategoryRepository.deleteMany(dto, tx);
  }
}
