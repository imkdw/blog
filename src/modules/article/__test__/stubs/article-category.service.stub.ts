/* eslint-disable @typescript-eslint/no-unused-vars */
import { FindOption } from '../../../../common/interfaces/find-option.interface';
import { TX } from '../../../../common/types/prisma';
import ArticleTag from '../../../article-tag/domain/article-tag.domain';
import { ArticleTagBuilder } from '../../../article-tag/entities/article-tag.entity';
import { IArticleTagService } from '../../../article-tag/interfaces/article-tag.interface';

export default class ArticleCategoryServiceStub implements IArticleTagService {
  isCallCreateMany = false;
  isCallDeleteByTagIds = false;
  isCallDeleteManyByArticleId = false;

  async createMany(articleId: string, tagIds: number[], tx: TX): Promise<void> {
    this.isCallCreateMany = true;
  }

  async deleteByTagIds(tagIds: number[], tx: TX): Promise<void> {
    this.isCallDeleteByTagIds = true;
  }

  async deleteManyByArticleId(articleId: string, tx?: TX): Promise<void> {
    this.isCallDeleteManyByArticleId = true;
  }

  async findManyByArticleId(articleId: string, option?: FindOption): Promise<ArticleTag[]> {
    if (articleId === '999') return [];
    const articleTag = new ArticleTagBuilder().articleId(articleId).build();
    return [articleTag];
  }

  reset() {
    this.isCallCreateMany = false;
    this.isCallDeleteByTagIds = false;
    this.isCallDeleteManyByArticleId = false;
  }
}
