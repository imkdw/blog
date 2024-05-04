/* eslint-disable @typescript-eslint/no-unused-vars */
import { FindOption } from '../../../../common/interfaces/find-option.interface';
import { TX } from '../../../../common/types/prisma';
import ArticleTag from '../../domain/article-tag.domain';
import { ArticleTagBuilder } from '../../entities/article-tag.entity';
import { IArticleTagService } from '../../interfaces/article-tag.interface';

export default class ArticleTagServiceStub implements IArticleTagService {
  isCallCreate = false;
  isCallDeleteByTagIds = false;
  isCallDeleteMany = false;
  isCallDeleteManyByArticleId = false;
  isCallFindManyByArticleId = false;

  async createMany(articleId: string, tagIds: number[], tx: TX): Promise<void> {
    this.isCallCreate = true;
  }

  async deleteByTagIds(tagIds: number[], tx: TX): Promise<void> {
    this.isCallDeleteByTagIds = true;
  }

  async deleteMany(dto: Partial<ArticleTag>, tx: TX): Promise<void> {
    this.isCallDeleteMany = true;
  }

  async deleteManyByArticleId(articleId: string, tx?: TX): Promise<void> {
    this.isCallDeleteManyByArticleId = true;
  }

  async findManyByArticleId(articleId: string, option?: FindOption): Promise<ArticleTag[]> {
    this.isCallFindManyByArticleId = true;
    return [];
  }

  reset() {
    this.isCallCreate = false;
    this.isCallDeleteByTagIds = false;
    this.isCallDeleteMany = false;
    this.isCallDeleteManyByArticleId = false;
    this.isCallFindManyByArticleId = false;
  }
}
