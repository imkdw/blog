import { Inject, Injectable } from '@nestjs/common';
import { ArticleTagService } from '../types/service/article-tag.service';
import { ArticleTagRepository, ArticleTagRepositorySymbol } from '../types/repository/article-tag.repository';
import ArticleTag from '../domain/article-tag.entity';
import { TX } from '../../../common/types/prisma';

@Injectable()
export default class ArticleTagServiceImpl implements ArticleTagService {
  constructor(@Inject(ArticleTagRepositorySymbol) private readonly articleTagRepository: ArticleTagRepository) {}

  async saveArticleTags(articleTags: ArticleTag[], tx?: TX): Promise<void> {
    await this.articleTagRepository.saveArticleTags(articleTags, tx);
  }
}
