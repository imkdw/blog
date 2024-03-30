import { Inject, Injectable } from '@nestjs/common';
import {
  ArticleTagRepositoryKey,
  IArticleTagRepository,
  IArticleTagService,
} from '../interfaces/article-tag.interface';
import { TX } from '../../../common/types/prisma';
import CreatingArticleTag from '../domain/models/creating-article-tag.model';
import ArticleTag from '../domain/entities/article-tag.entity';
import { FindOption } from '../../../common/interfaces/find-option.interface';

@Injectable()
export default class ArticleTagService implements IArticleTagService {
  constructor(@Inject(ArticleTagRepositoryKey) private readonly articleTagRepository: IArticleTagRepository) {}

  async createMany(articleId: string, tagIds: number[], tx: TX): Promise<void> {
    const articleTags = tagIds.map((tagId, index) => new CreatingArticleTag({ articleId, tagId, sort: index + 1 }));
    await this.articleTagRepository.createMany(articleTags, tx);
  }

  async findManyByArticleId(articleId: string, option: FindOption): Promise<ArticleTag[]> {
    const articleTags = this.articleTagRepository.findManyByArticleId(articleId, option);
    return articleTags;
  }

  async deleteManyByArticleId(articleId: string, tx: TX): Promise<void> {
    await this.articleTagRepository.deleteManyByArticleId(articleId, tx);
  }
}
