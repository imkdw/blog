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
        ...(!option.includeDeleted && { deleteAt: null }),
      },
    });

    return row ? this.articleMapper.toArticle(row) : null;
  }

  async findMany(dto: Partial<Article>, option: FindOption): Promise<Article[]> {
    const rows = await this.prisma.articles.findMany({
      where: {
        ...dto,
        ...(!option.includeDeleted && { deleteAt: null }),
      },
    });

    return rows.map((row) => this.articleMapper.toArticle(row));
  }

  async findManyByIds(ids: string[], option: FindOption): Promise<Article[]> {
    const rows = await this.prisma.articles.findMany({
      where: {
        id: { in: ids },
        ...(!option.includeDeleted && { deleteAt: null }),
      },
    });

    return rows.map((row) => this.articleMapper.toArticle(row));
  }

  async save(article: Article, tx: TX): Promise<Article> {
    const row = await tx.articles.create({
      data: article,
    });

    return this.articleMapper.toArticle(row);
  }

  async findManyOrderByLikeCount(option: FindOption): Promise<Article[]> {
    const rows = await this.prisma.articles.findMany({
      where: {
        ...(!option.includeDeleted && { deleteAt: null }),
      },
      orderBy: {
        likeCount: 'desc',
      },
      ...(option.count && { take: option.count }),
    });

    return rows.map((row) => this.articleMapper.toArticle(row));
  }

  async findManyOrderByCreateAt(dto: Partial<Article>, option: FindOption): Promise<Article[]> {
    const rows = await this.prisma.articles.findMany({
      where: {
        ...dto,
        ...(!option.includeDeleted && { deleteAt: null }),
      },
      orderBy: {
        createAt: 'desc',
      },
      ...(option.count && { take: option.count }),
    });

    return rows.map((row) => this.articleMapper.toArticle(row));
  }

  async delete(articleId: string, tx: TX): Promise<void> {
    await tx.articles.delete({
      where: {
        id: articleId,
      },
    });
  }

  async update(articleId: string, data: Partial<Article>, tx?: TX): Promise<Article> {
    const prisma = tx ?? this.prisma;
    const row = await prisma.articles.update({
      where: {
        id: articleId,
      },
      data,
    });

    return this.articleMapper.toArticle(row);
  }
}
