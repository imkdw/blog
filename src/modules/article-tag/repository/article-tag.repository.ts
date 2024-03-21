import { Injectable } from '@nestjs/common';

import { IArticleTagRepository } from '../interfaces/article-tag.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { TX } from '../../../common/types/prisma';
import ArticleTag from '../domain/entities/article-tag.entity';

@Injectable()
export default class ArticleTagRepository implements IArticleTagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createMany(data: ArticleTag[], tx: TX): Promise<void> {
    await tx.articleTag.createMany({ data });
  }
}
