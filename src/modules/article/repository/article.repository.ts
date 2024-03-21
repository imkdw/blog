import { Inject, Injectable } from '@nestjs/common';
import { ArticleMapperKey, IArticleMapper, IArticleRepository } from '../interfaces/article.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import Article from '../domain/entities/article.entity';
import { TX } from '../../../common/types/prisma';

@Injectable()
export default class ArticleRepository implements IArticleRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(ArticleMapperKey) private readonly articleMapper: IArticleMapper,
  ) {}

  async findOne(dto: Partial<Article>, option: FindOption): Promise<Article | null> {
    const row = await this.prisma.articles.findFirst({
      where: {
        ...dto,
        ...(option.includeDeleted ? {} : { deleteAt: null }),
      },
    });

    return row ? this.articleMapper.toArticle(row) : null;
  }

  async save(article: Article, tx: TX): Promise<Article> {
    const row = await tx.articles.create({
      data: article,
    });

    return this.articleMapper.toArticle(row);
  }
}
