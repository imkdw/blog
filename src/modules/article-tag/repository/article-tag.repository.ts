import { Inject, Injectable } from '@nestjs/common';

import { ArticleTagMapperKey, IArticleTagMapper, IArticleTagRepository } from '../interfaces/article-tag.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { TX } from '../../../common/types/prisma';
import ArticleTag from '../domain/entities/article-tag.entity';
import { FindOption } from '../../../common/interfaces/find-option.interface';

@Injectable()
export default class ArticleTagRepository implements IArticleTagRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(ArticleTagMapperKey) private readonly articleTagMapper: IArticleTagMapper,
  ) {}

  async createMany(data: ArticleTag[], tx: TX): Promise<void> {
    await tx.articleTag.createMany({ data });
  }

  async findManyByArticleId(articleId: string, option: FindOption): Promise<ArticleTag[]> {
    const rows = await this.prisma.articleTag.findMany({
      where: { articleId, ...(!option.includeDeleted && { deleteAt: null }) },
    });
    return rows.map((row) => this.articleTagMapper.toArticleTag(row));
  }

  async deleteByArticleId(articleId: string, tx: TX): Promise<void> {
    await tx.articleTag.deleteMany({ where: { articleId } });
  }

  async deleteByTagIds(tagIds: number[], tx: TX): Promise<void> {
    await tx.articleTag.deleteMany({ where: { tagId: { in: tagIds } } });
  }
}
