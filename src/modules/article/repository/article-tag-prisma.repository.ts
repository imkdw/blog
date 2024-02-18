import { Injectable } from '@nestjs/common';
import { ArticleTagRepository } from '../types/repository/article-tag.repository';
import ArticleTag from '../domain/article-tag.entity';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { TX } from '../../../common/types/prisma';

@Injectable()
export default class ArticleTagPrismaRepository implements ArticleTagRepository {
  constructor(private readonly prisma: PrismaService) {}

  async saveArticleTags(articleTags: ArticleTag[], tx?: TX): Promise<void> {
    const prisma = tx || this.prisma;
    await prisma.articleTag.createMany({ data: articleTags });
  }
}
