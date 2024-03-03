import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ArticleService } from '../types/service/article.service';
import { ArticleRepository, ArticleRepositorySymbol } from '../types/repository/article.repository';
import RequestCreateArticleDto from '../types/dto/request/create-article.dto';
import { CategoryService, CategoryServiceSymbol } from '../../category/types/category.service';
import { TagService, TagServiceSymbol } from '../../tag/types/tag.service';
import { CreateTagDto } from '../../tag/types/dto/internal/create-tag.dto';
import Article from '../domain/article.entity';
import ArticleTag from '../../article-tag/domain/article-tag.entity';
import { ArticleTagService, ArticleTagServiceSymbol } from '../../article-tag/types/service/article-tag.service';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { CreateArticleResult } from '../types/internal/create-article.dto';
import {
  ArticleCategoryRepository,
  ArticleCategoryRepositorySymbol,
} from '../types/repository/article-category.repository';
import ArticleCategory from '../domain/article-category.entity';
import { TX } from '../../../common/types/prisma';

@Injectable()
export default class ArticleServiceImpl implements ArticleService {
  constructor(
    @Inject(CategoryServiceSymbol) private readonly categoryService: CategoryService,
    @Inject(TagServiceSymbol) private readonly tagService: TagService,
    @Inject(ArticleTagServiceSymbol) private readonly articleTagService: ArticleTagService,
    @Inject(ArticleRepositorySymbol) private readonly articleRepository: ArticleRepository,
    @Inject(ArticleCategoryRepositorySymbol) private readonly articleCategoryRepository: ArticleCategoryRepository,
    private readonly prisma: PrismaService,
  ) {}

  async createArticle(dto: RequestCreateArticleDto, userId: string): Promise<CreateArticleResult> {
    const { childCategoryId, content, id, parentCategoryId, summary, tags, title } = dto;

    const existArticle = await this.findById(id);
    if (existArticle) {
      // TODO: 에러처리
      throw new ConflictException('이미 존재하는 게시글 아이디 입니다');
    }

    // 카테고리 검증
    const parentCategory = await this.categoryService.findById(parentCategoryId);
    if (!parentCategory) {
      // TODO: 에러 처리
      throw new NotFoundException('카테고리가 존재하지 않습니다.');
    }

    const childCategory = await this.categoryService.findById(childCategoryId);
    if (!childCategory || childCategory.parentId !== parentCategory.id) {
      // TODO: 에러처리
      throw new NotFoundException('카테고리가 존재하지 않습니다.');
    }

    // TODO: 태그 구분로직 리팩토링 필요
    const tagNames = tags.map((tag) => tag.tagName);
    const existTags = await this.tagService.findTagsByNames(tagNames);
    const existTagNames = existTags.map((tag) => tag.name);
    const createTagDtos = tagNames
      .filter((tagName) => !existTagNames.includes(tagName))
      .map((tagName): CreateTagDto => ({ name: tagName }));

    // 게시글 생성
    const article = new Article({
      id,
      userId,
      title,
      summary,
      content,
      thumbnail: '',
      createUser: userId,
      updateUser: userId,
    });

    const createdArticle = await this.prisma.$transaction(async (tx) => {
      /**
       * DB 저장 순서
       * 1. 게시글 저장
       * 2. 새로운 태그들 저장
       * 3. 게시글-태그 조인테이블 저장
       */
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const createdArticle = await this.articleRepository.createArticle(article, tx);

      const createdTags = await this.tagService.createTags(createTagDtos, userId);
      const allTags = [...existTags, ...createdTags];
      const articleTagsWithSort = allTags.map((tag) => {
        const { sort } = tags.find((item) => item.tagName === tag.name);
        return {
          ...tag,
          sort,
        };
      });

      // 게시글-태그 조인테이블 생성
      const articleTags = articleTagsWithSort.map(
        (tag) =>
          new ArticleTag({ articleId: id, tagId: tag.id, sort: tag.sort, createUser: userId, updateUser: userId }),
      );
      await this.articleTagService.saveArticleTags(articleTags, tx);

      // 게시글 카테고리 테이블 생성
      const articleParentCategory = new ArticleCategory({
        articleId: createdArticle.id,
        categoryId: parentCategory.id,
        createUser: userId,
        updateUser: userId,
      });

      const articleChildCategory = new ArticleCategory({
        articleId: createdArticle.id,
        categoryId: childCategory.id,
        createUser: userId,
        updateUser: userId,
      });

      await this.articleCategoryRepository.saveArticleCategory(articleParentCategory, tx);
      await this.articleCategoryRepository.saveArticleCategory(articleChildCategory, tx);

      return createdArticle;
    });

    return createdArticle;
  }

  async getArticleDetail(articleId: string): Promise<Article> {
    const article = await this.findById(articleId);
    if (!article) {
      // TODO: 에러처리
      throw new NotFoundException('게시글이 존재하지 않습니다.');
    }

    return article;
  }

  async findById(articleId: string): Promise<Article | null> {
    const article = await this.articleRepository.findById(articleId);
    return article;
  }

  async checkArticleId(articleId: string): Promise<boolean> {
    const existArticle = await this.findById(articleId);
    return !!existArticle;
  }

  async findArticlesByParam(param: string) {
    let articles: Article[] = [];

    if (!param) {
      articles = await this.articleRepository.findAll();
      return articles;
    }

    const category = await this.categoryService.findByParam(param);
    if (!category) {
      return [];
    }

    const articleCategories = await this.articleCategoryRepository.findManyByCategoryId(category.id);
    if (!articleCategories.length) {
      return [];
    }

    const articleIds = articleCategories.map((articleCategory) => articleCategory.articleId);
    articles = await this.articleRepository.findByIds(articleIds);

    return articles;
  }

  async addArticleCommentCount(articleId: string, tx?: TX): Promise<void> {
    await this.articleRepository.updateArticle(articleId, { commentCount: { increment: 1 } }, tx);
  }
}
