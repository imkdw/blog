import { Inject, Injectable } from '@nestjs/common';
import {
  ArticleTagRepositoryKey,
  IArticleTagRepository,
  IArticleTagService,
} from '../interfaces/article-tag.interface';
import { TX } from '../../../common/types/prisma';
import { ArticleTagBuilder } from '../entities/article-tag.entity';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import ArticleTag from '../domain/article-tag.domain';

@Injectable()
export default class ArticleTagService implements IArticleTagService {
  constructor(@Inject(ArticleTagRepositoryKey) private readonly articleTagRepository: IArticleTagRepository) {}

  async createMany(articleId: string, tagIds: number[], tx: TX): Promise<void> {
    const articleTags = tagIds.map((tagId, index) =>
      new ArticleTagBuilder()
        .articleId(articleId)
        .tagId(tagId)
        .sort(index + 1)
        .build(),
    );
    await this.articleTagRepository.createMany(articleTags, tx);
  }

  async deleteByTagIds(tagIds: number[], tx: TX): Promise<void> {
    await this.articleTagRepository.deleteByTagIds(tagIds, tx);
  }

  async deleteManyByArticleId(articleId: string, tx?: TX): Promise<void> {
    await this.articleTagRepository.deleteManyByArticleId(articleId, tx);
  }

  async findManyByArticleId(articleId: string, option?: FindOption): Promise<ArticleTag[]> {
    const articleTags = await this.articleTagRepository.findManyByArticleId(articleId, option);
    return articleTags;
  }
}
