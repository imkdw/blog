import { Controller, Inject } from '@nestjs/common';
import { ArticleService, ArticleServiceSymbol } from '../types/article.service';

@Controller({ path: 'articles', version: '1' })
export default class ArticleController {
  constructor(@Inject(ArticleServiceSymbol) private readonly articleService: ArticleService) {}
}
