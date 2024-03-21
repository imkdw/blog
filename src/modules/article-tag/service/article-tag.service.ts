import { Inject, Injectable } from '@nestjs/common';
import {
  ArticleTagRepositoryKey,
  IArticleTagRepository,
  IArticleTagService,
} from '../interfaces/article-tag.interface';
import { TX } from '../../../common/types/prisma';
import CreatingArticleTag from '../domain/models/creating-article-tag.model';

@Injectable()
export default class ArticleTagService implements IArticleTagService {
  constructor(@Inject(ArticleTagRepositoryKey) private readonly articleTagRepository: IArticleTagRepository) {}

  async createMany(articleId: string, tagIds: number[], tx: TX): Promise<void> {
    const articleTags = tagIds.map((tagId, index) => new CreatingArticleTag({ articleId, tagId, sort: index + 1 }));
    await this.articleTagRepository.createMany(articleTags, tx);
  }
}
