import { Test } from '@nestjs/testing';
import { ArticleRepositoryKey, ArticleServiceKey, IArticleService } from '../../interfaces/article.interface';
import ArticleService from '../../service/article.service';
import CategoryServiceStub from '../../../category/__test__/stubs/category.service.stub';
import TagServiceStub from '../../../tag/__test__/stubs/tag.service.stub';
import ArticleTagServiceStub from '../../../article-tag/__test__/stubs/article-tag.service.stub';
import ArticleCommentServiceStub from '../stubs/article-coment.service.stub';
import ArticleCategoryServiceStub from '../stubs/article-category.service.stub';
import ArticleLikeServiceStub from '../stubs/article-like.service.stub';
import AwsS3ServiceStub from '../../../../infra/aws/__test__/stubs/aws-s3.service.stub';
import { CategoryServiceKey } from '../../../category/interfaces/category.interface';
import { TagServiceKey } from '../../../tag/interfaces/tag.interface';
import { ArticleTagServiceKey } from '../../../article-tag/interfaces/article-tag.interface';
import { ArticleCommentServiceKey } from '../../interfaces/article-comment.interface';
import { ArticleCategoryServiceKey } from '../../interfaces/article-category.interface';
import { ArticleLikeServiceKey } from '../../interfaces/article-like.interface';
import { AwsS3ServiceKey } from '../../../../infra/aws/interfaces/s3.interface';
import ArticleRepositoryStub from '../stubs/article.repository.stub';
import PrismaService from '../../../../infra/database/prisma/service/prisma.service';
import { ArticleBuilder } from '../../entities/article/article.entity';
import { CreateArticleDto } from '../../dto/internal/article.dto';
import { ExistArticleIdException } from '../../../../common/exceptions/409';
import { ArticleNotFoundException, CategoryNotFoundException } from '../../../../common/exceptions/404';
import prismaMock from '../../../../prisma/__test__/singleton';
import { ResponseGetArticleDetailDto } from '../../dto/response/article.dto';

describe('ArticleService', () => {
  let articleService: IArticleService;
  let articleRepository: ArticleRepositoryStub;
  let categoryService: CategoryServiceStub;
  let tagService: TagServiceStub;
  let articleTagService: ArticleTagServiceStub;
  let articleCommentService: ArticleCommentServiceStub;
  let articleCategoryService: ArticleCategoryServiceStub;
  let articleLikeService: ArticleLikeServiceStub;
  let awsS3Servie: AwsS3ServiceStub;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: ArticleServiceKey,
          useClass: ArticleService,
        },
        {
          provide: ArticleRepositoryKey,
          useClass: ArticleRepositoryStub,
        },
        {
          provide: CategoryServiceKey,
          useClass: CategoryServiceStub,
        },
        {
          provide: TagServiceKey,
          useClass: TagServiceStub,
        },
        {
          provide: ArticleTagServiceKey,
          useClass: ArticleTagServiceStub,
        },
        {
          provide: ArticleCommentServiceKey,
          useClass: ArticleCommentServiceStub,
        },
        {
          provide: ArticleCategoryServiceKey,
          useClass: ArticleCategoryServiceStub,
        },
        {
          provide: ArticleLikeServiceKey,
          useClass: ArticleLikeServiceStub,
        },
        {
          provide: AwsS3ServiceKey,
          useClass: AwsS3ServiceStub,
        },
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    articleService = module.get<IArticleService>(ArticleServiceKey);
    articleRepository = module.get<ArticleRepositoryStub>(ArticleRepositoryKey);
    categoryService = module.get<CategoryServiceStub>(CategoryServiceKey);
    tagService = module.get<TagServiceStub>(TagServiceKey);
    articleTagService = module.get<ArticleTagServiceStub>(ArticleTagServiceKey);
    articleCommentService = module.get<ArticleCommentServiceStub>(ArticleCommentServiceKey);
    articleCategoryService = module.get<ArticleCategoryServiceStub>(ArticleCategoryServiceKey);
    articleLikeService = module.get<ArticleLikeServiceStub>(ArticleLikeServiceKey);
    awsS3Servie = module.get<AwsS3ServiceStub>(AwsS3ServiceKey);

    articleRepository.reset();
    awsS3Servie.reset();
  });

  describe('createArticle', () => {
    const createArticleDto: CreateArticleDto = {
      childCategoryId: 1,
      content: '',
      id: '1',
      images: [],
      parentCategoryId: 2,
      summary: '',
      tags: [],
      thumbnail: '',
      title: '',
    };

    it('중복된 아이디가 존재하는 경우 ExistArticleIdException 예외를 던진다', async () => {
      // given
      const newArticle = new ArticleBuilder().id(createArticleDto.id).build();
      await articleRepository.save(newArticle);

      // when, then
      await expect(articleService.createArticle('userId', createArticleDto)).rejects.toThrow(ExistArticleIdException);
    });

    describe('카테고리 검사', () => {
      it('부모 카테고리가 존재하지 않는 경우 CategoryNotFoundException 예외를 던진다', async () => {
        // given
        const dto: CreateArticleDto = { ...createArticleDto, parentCategoryId: 999 };
        await expect(() => articleService.createArticle('userId', dto)).rejects.toThrow(CategoryNotFoundException);
      });
      it('자식 카테고리가 존재하지 않는 경우 CategoryNotFoundException 예외를 던진다', async () => {
        // given
        const dto: CreateArticleDto = { ...createArticleDto, childCategoryId: 999 };
        await expect(() => articleService.createArticle('userId', dto)).rejects.toThrow(CategoryNotFoundException);
      });
    });

    describe('게시글 생성 성공', () => {
      it('presigned url에 저장된 썸네일, 본문 이미지의 위치를 변경한다', async () => {
        // when
        await articleService.createArticle('userId', createArticleDto);

        // then
        expect(awsS3Servie.callCopyFileCount).toBe(2);
      });

      it('생성된 게시글을 반환한다', async () => {
        // when
        const newArticle = new ArticleBuilder()
          .id(createArticleDto.id)
          .userId('userId')
          .title(createArticleDto.title)
          .content(createArticleDto.content)
          .summary(createArticleDto.summary)
          .thumbnail(createArticleDto.thumbnail)
          .build();
        prismaMock.$transaction.mockResolvedValue(newArticle);

        const article = await articleService.createArticle('userId', createArticleDto);

        // then
        expect(article).toBe(newArticle);
      });
    });
  });

  describe('getArticleDetail', () => {
    it('게시글이 없는 경우 ArticleNotFoundException 예외를 던진다', async () => {
      // when, then
      await expect(() => articleService.getArticleDetail('userId', '999')).rejects.toThrow(ArticleNotFoundException);
    });

    describe('게시글 좋아요 여부 조회', () => {
      describe('로그인한 상태에서 조회', () => {
        it('좋아요를 누른 유저의 경우 좋아요 여부는 true를 반환한다', async () => {
          // given
          const article = new ArticleBuilder().id('1').build();
          articleRepository.save(article);

          // when
          const articleDetail = await articleService.getArticleDetail('userId', '1');

          // then
          expect(articleDetail.like.isLiked).toBe(true);
        });
        it('좋아요를 누르지 않은 유저의 경우 좋아요 여부는 false를 반환한다', async () => {
          // given
          const article = new ArticleBuilder().id('1').build();
          articleRepository.save(article);

          // when
          const articleDetail = await articleService.getArticleDetail('999', '1');

          // then
          expect(articleDetail.like.isLiked).toBe(false);
        });
      });
      it('비로그인 상태에서 조회시 좋아요 여부는 false를 반환한다', async () => {
        // given
        const article = new ArticleBuilder().id('1').build();
        articleRepository.save(article);

        // when
        const articleDetail = await articleService.getArticleDetail(null, '1');

        // then
        expect(articleDetail.like.isLiked).toBe(false);
      });
    });

    it('게시글 상세정보 조회 성공', async () => {
      // given
      const article = new ArticleBuilder().id('1').likeCount(1).build();
      articleRepository.save(article);

      // when
      const articleDetail = await articleService.getArticleDetail('userId', '1');

      // then
      const result: ResponseGetArticleDetailDto = {
        articleId: article.id,
        commentCount: 0,
        content: article.content,
        createdAt: article.createAt,
        like: { isLiked: true, likeCount: 1 },
        summary: article.summary,
        thumbnail: article.thumbnail,
        title: article.title,
        viewCount: 0,
      };
      expect(articleDetail).toEqual(result);
    });
  });
});
