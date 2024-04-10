import { Injectable } from '@nestjs/common';

import { IArticleTagRepository } from '../interfaces/article-tag.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { TX } from '../../../common/types/prisma';
import ArticleTag from '../domain/article-tag.domain';
import { FindOption } from '../../../common/interfaces/find-option.interface';

@Injectable()
export default class ArticleTagRepository implements IArticleTagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(data: ArticleTag[], tx: TX): Promise<void> {
    await tx.articleTag.createMany({ data });
  }

  async findManyByArticleId(articleId: string, option: FindOption): Promise<ArticleTag[]> {
    const rows = await this.prisma.articleTag.findMany({
      where: { articleId, ...(!option.includeDeleted && { deleteAt: null }) },
    });
    return rows.map((row) => new ArticleTag(row));
  }

  async deleteMany(dto: Partial<ArticleTag>, tx: TX): Promise<void> {
    await tx.articleTag.deleteMany({ where: dto });
  }

  async findMany(dto: Partial<ArticleTag>, option: FindOption): Promise<ArticleTag[]> {
    const rows = await this.prisma.articleTag.findMany({
      where: { ...dto, ...(!option.includeDeleted && { deleteAt: null }) },
    });
    return rows.map((row) => new ArticleTag(row));
  }

  async deleteByTagIds(tagIds: number[], tx: TX): Promise<void> {
    await tx.articleTag.deleteMany({ where: { tagId: { in: tagIds } } });
  }
}
