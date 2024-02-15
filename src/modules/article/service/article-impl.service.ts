import { Inject, Injectable } from '@nestjs/common';
import { ArticleService } from '../types/article.service';
import { ArticleRepository, ArticleRepositorySymbol } from '../types/article.repository';

@Injectable()
export default class ArticleServiceImpl implements ArticleService {
  constructor(@Inject(ArticleRepositorySymbol) private readonly articleRepository: ArticleRepository) {}
}
