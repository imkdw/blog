import { Inject, Injectable } from '@nestjs/common';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { IArticleLikeRepository } from '../interfaces/article-like.interface';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import ArticleLike from '../domain/entities/article-like.entity';
import { ArticleMapperKey, IArticleMapper } from '../interfaces/article.interface';
import CreatingArticleLike from '../domain/models/creating-article-like.model';
import { TX } from '../../../common/types/prisma';

@Injectable()
export default class ArticleLikeRepository implements IArticleLikeRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(ArticleMapperKey) private readonly articleMapper: IArticleMapper,
  ) {}

  async findOne(dto: Partial<ArticleLike>, option: FindOption): Promise<ArticleLike | null> {
    const row = await this.prisma.articleLike.findFirst({
      where: dto,
      ...(option.includeDeleted ? {} : { where: { deleteAt: null } }),
    });

    return row ? this.articleMapper.toArticleLike(row) : null;
  }

  async delete(id: number): Promise<void> {
    await this.prisma.articleLike.delete({ where: { id } });
  }

  async save(data: CreatingArticleLike, tx: TX): Promise<void> {
    await tx.articleLike.create({ data });
  }
}
