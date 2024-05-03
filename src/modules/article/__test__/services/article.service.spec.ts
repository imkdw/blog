import { Test } from '@nestjs/testing';
import { ArticleServiceKey, IArticleService } from '../../interfaces/article.interface';
import ArticleService from '../../service/article.service';
import CategoryServiceStub from '../../../category/__test__/stubs/category.service.stub';

describe('ArticleService', () => {
  let articleService: IArticleService;
  let categoryService: CategoryServiceStub;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: ArticleServiceKey,
          useClass: ArticleService,
        },
      ],
    }).compile();
  });

  describe('createArticle', () => {});
});
