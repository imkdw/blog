import { Inject, Injectable } from '@nestjs/common';
import {
  ArticleTagRepositoryKey,
  IArticleTagRepository,
  IArticleTagService,
} from '../interfaces/article-tag.interface';
import { TX } from '../../../common/types/prisma';
import ArticleTag from '../domain/article-tag.domain';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import CreateArticleTag from '../domain/create';

@Injectable()
export default class ArticleTagService implements IArticleTagService {
  constructor(@Inject(ArticleTagRepositoryKey) private readonly articleTagRepository: IArticleTagRepository) {}

  async createMany(articleId: string, tagIds: number[], tx: TX): Promise<void> {
    const articleTags = tagIds.map((tagId, index) => new CreateArticleTag({ articleId, tagId, sort: index + 1 }));
    await this.articleTagRepository.createMany(articleTags, tx);
  }

  async deleteByTagIds(tagIds: number[], tx: TX): Promise<void> {
    await this.articleTagRepository.deleteByTagIds(tagIds, tx);
  }

  async deleteMany(dto: Partial<ArticleTag>, tx: TX): Promise<void> {
    await this.articleTagRepository.deleteMany(dto, tx);
  }

  findMany(dto: Partial<ArticleTag>, option: FindOption): Promise<ArticleTag[]> {
    return this.articleTagRepository.findMany(dto, option);
  }
}
