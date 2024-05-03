import { Injectable } from '@nestjs/common';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import { TX } from '../../../common/types/prisma';
import { IArticleRepository } from '../interfaces/article.interface';
import ArticleEntity from '../entities/article/article.entity';

@Injectable()
export default class ArticleRepository implements IArticleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findManyByIds(ids: string[], option?: FindOption): Promise<ArticleEntity[]> {
    const rows = await this.prisma.articles.findMany({
      where: {
        id: { in: ids },
        ...(!option?.includeDeleted && { deleteAt: null }),
      },
    });

    return rows.map((row) => new ArticleEntity(row));
  }

  async save(article: ArticleEntity, tx: TX): Promise<ArticleEntity> {
    const row = await tx.articles.create({
      data: article,
    });

    return new ArticleEntity(row);
  }

  async findManyOrderByLikeCount(option?: FindOption): Promise<ArticleEntity[]> {
    const rows = await this.prisma.articles.findMany({
      where: {
        ...(!option?.includeDeleted && { deleteAt: null }),
      },
      orderBy: {
        likeCount: 'desc',
      },
      ...(option.count && { take: option.count }),
    });

    return rows.map((row) => new ArticleEntity(row));
  }

  async findManyOrderByCreateAt(dto: Partial<ArticleEntity>, option?: FindOption): Promise<ArticleEntity[]> {
    const rows = await this.prisma.articles.findMany({
      where: {
        ...dto,
        ...(!option?.includeDeleted && { deleteAt: null }),
      },
      orderBy: {
        createAt: 'desc',
      },
      ...(option.count && { take: option.count }),
    });

    return rows.map((row) => new ArticleEntity(row));
  }

  async delete(articleId: string, tx: TX): Promise<void> {
    await tx.articles.delete({
      where: {
        id: articleId,
      },
    });
  }

  async update(articleId: string, data: Partial<ArticleEntity>, tx?: TX): Promise<ArticleEntity> {
    const prisma = tx ?? this.prisma;
    const row = await prisma.articles.update({
      where: {
        id: articleId,
      },
      data,
    });

    return new ArticleEntity(row);
  }

  async findAll(option?: FindOption): Promise<ArticleEntity[]> {
    const rows = await this.prisma.articles.findMany({
      where: {
        ...(!option?.includeDeleted && { deleteAt: null }),
      },
    });

    return rows.map((row) => new ArticleEntity(row));
  }

  async findById(id: string, option?: FindOption): Promise<ArticleEntity | null> {
    const row = await this.prisma.articles.findUnique({
      where: {
        id,
        ...(!option?.includeDeleted && { deleteAt: null }),
      },
    });

    return row ? new ArticleEntity(row) : null;
  }
}
