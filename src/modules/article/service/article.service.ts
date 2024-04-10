import { Inject, Injectable } from '@nestjs/common';
import {
  ArticleRepositoryKey,
  GetArticlesData,
  IArticleRepository,
  IArticleService,
} from '../interfaces/article.interface';
import Article from '../domain/entities/article.entity';
import { CreateArticleDto, UpdateArticleDto } from '../dto/internal/article.dto';
import { ExistArticleIdException } from '../../../common/exceptions/409';
import { CategoryServiceKey, ICategoryService } from '../../category/interfaces/category.interface';
import { ArticleNotFoundException, CategoryNotFoundException } from '../../../common/exceptions/404';
import { ITagService, TagServiceKey } from '../../tag/interfaces/tag.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import CreatingArticle from '../domain/models/creating-article.model';
import { ArticleTagServiceKey, IArticleTagService } from '../../article-tag/interfaces/article-tag.interface';
import { ArticleCommentServiceKey, IArticleCommentService } from '../interfaces/article-comment.interface';
import ArticleComment from '../domain/entities/article-comment.entity';
import { CreateCommentDto } from '../dto/internal/article-comment.dto';
import { GetCommentsContent, ResponseGetCommentsDto } from '../dto/response/article-comment.dto';
import { ArticleCategoryServiceKey, IArticleCategoryService } from '../interfaces/article-category.interface';
import { ArticleLikeServiceKey, IArticleLikeService } from '../interfaces/article-like.interface';
import { ResponseToggleArticleLikeDto } from '../dto/response/article-like.dto';
import { ResponseGetArticleDetailDto } from '../dto/response/article.dto';
import { GetArticlesType, IGetArticlesType } from '../enums/article.enum';
import { generateThumbnail, replaceContentImageUrl } from '../functions/article.function';
import { S3Bucket, S3BucketDirectory } from '../../../infra/aws/enums/s3.enum';
import { AwsS3ServiceKey } from '../../../infra/aws/interfaces/s3.interface';
import AwsS3Service from '../../../infra/aws/service/s3.service';
import Tag from '../../tag/domain/tag.domain';

@Injectable()
export default class ArticleService implements IArticleService {
  constructor(
    @Inject(ArticleRepositoryKey) private readonly articleRepository: IArticleRepository,
    @Inject(CategoryServiceKey) private readonly categoryService: ICategoryService,
    @Inject(TagServiceKey) private readonly tagService: ITagService,
    @Inject(ArticleTagServiceKey) private readonly articleTagService: IArticleTagService,
    @Inject(ArticleCommentServiceKey) private readonly articleCommentService: IArticleCommentService,
    @Inject(ArticleCategoryServiceKey) private readonly articleCategoryService: IArticleCategoryService,
    @Inject(ArticleLikeServiceKey) private readonly articleLikeService: IArticleLikeService,
    @Inject(AwsS3ServiceKey) private readonly awsS3Service: AwsS3Service,
    private readonly prisma: PrismaService,
  ) {}

  async createArticle(userId: string, dto: CreateArticleDto): Promise<Article> {
    // 아이디 중복검사
    const existArticle = await this.articleRepository.findOne({ id: dto.id }, { includeDeleted: true });
    if (existArticle) throw new ExistArticleIdException(dto.id);

    // 카테고리 아이디 존재여부 검사
    const parentCategory = await this.categoryService.findOne({ id: dto.parentCategoryId }, { includeDeleted: false });
    const childCategory = await this.categoryService.findOne({ id: dto.childCategoryId }, { includeDeleted: false });
    if (!parentCategory || !childCategory) throw new CategoryNotFoundException();

    // 본문 이미지 URL 변경
    const replacedContent = replaceContentImageUrl(dto.id, dto.content);

    // 썸네일 지정
    const thumbnail = generateThumbnail(dto.id, dto.thumbnail);

    // 썸네일 이미지 S3 버킷 변경
    await this.awsS3Service.copyFile({
      from: S3Bucket.PRESIGNED,
      to: S3Bucket.STATIC,
      originalFileNames: [dto.thumbnail],
      fileNames: [`${S3BucketDirectory.ARTICLE_IMAGE}/${dto.id}/${dto.thumbnail}`],
    });

    // 본문 이미지 S3 버킷 변경
    const imagesWithDirectory = dto.images.map((image) => `${S3BucketDirectory.ARTICLE_IMAGE}/${dto.id}/${image}`);
    await this.awsS3Service.copyFile({
      from: S3Bucket.PRESIGNED,
      to: S3Bucket.STATIC,
      originalFileNames: dto.images,
      fileNames: imagesWithDirectory,
    });

    const creatingArticle = new CreatingArticle({ ...dto, userId, thumbnail, content: replacedContent });

    const createdArticle = await this.prisma.$transaction(async (tx) => {
      /** dto.tags에 있는 태그들을 찾아서 없으면 생성하고, 있으면 그대로 사용 */
      const tags = await Promise.all(
        dto.tags.map(async (tagName) => {
          let tag = await this.tagService.findOne({ name: tagName }, { includeDeleted: false });
          if (!tag) tag = await this.tagService.create({ name: tagName }, tx);

          return tag;
        }),
      );
      const tagIds = tags.map((tag) => tag.id);

      /** 게시글 생성 */
      const article = await this.articleRepository.save(creatingArticle, tx);

      /** 게시글-카테고리, 게시글-태그 생성 */
      await Promise.all([
        this.articleCategoryService.create(article.id, parentCategory.id, tx),
        this.articleCategoryService.create(article.id, childCategory.id, tx),
        this.articleTagService.createMany(article.id, tagIds, tx),
      ]);

      return article;
    });

    return createdArticle;
  }

  async getArticleDetail(userId: string | undefined, articleId: string): Promise<ResponseGetArticleDetailDto> {
    const article = await this.articleRepository.findOne({ id: articleId }, { includeDeleted: false });
    if (!article) throw new ArticleNotFoundException();

    const articleLike = await this.articleLikeService.findOne(
      { userId, articleId: article.id },
      { includeDeleted: false },
    );

    return {
      articleId: article.id,
      title: article.title,
      content: article.content,
      commentCount: article.commentCount,
      createdAt: article.createAt,
      summary: article.summary,
      thumbnail: article.thumbnail,
      viewCount: article.viewCount,
      like: {
        likeCount: article.likeCount,
        isLiked: !!articleLike,
      },
    };
  }

  async getArticleTags(articleId: string): Promise<Tag[]> {
    const existArticle = await this.articleRepository.findOne({ id: articleId }, { includeDeleted: false });
    if (!existArticle) throw new ArticleNotFoundException();

    const articleTags = await this.articleTagService.findMany({ articleId }, { includeDeleted: false });
    if (!articleTags.length) return [];
    const tagIds = articleTags.map((articleTag) => articleTag.tagId);

    const tags = await this.tagService.findManyByIds(tagIds, { includeDeleted: false });
    return tags;
  }

  async createComment(userId: string, articleId: string, dto: CreateCommentDto): Promise<ArticleComment> {
    const article = await this.articleRepository.findOne({ id: articleId }, { includeDeleted: false });
    if (!article) throw new ArticleNotFoundException();

    const createdComment = await this.prisma.$transaction(async (tx) => {
      const comment = await this.articleCommentService.createComment(userId, article.id, dto, tx);
      await this.articleRepository.update(article.id, { commentCount: article.commentCount + 1 }, tx);
      return comment;
    });

    return createdComment;
  }

  async getArticleCommentsWithUser(userId: string | undefined, articleId: string): Promise<ResponseGetCommentsDto> {
    const article = await this.articleRepository.findOne({ id: articleId }, { includeDeleted: false });
    if (!article) throw new ArticleNotFoundException();

    const comments = await this.articleCommentService.getArticleComments(articleId);
    const commentsWithUser = comments.map(
      (comment): GetCommentsContent => ({
        id: comment.id,
        content: comment.content,
        createdAt: comment.createAt,
        user: {
          isAuthor: comment.userId === userId,
          nickname: comment.user.nickname,
          profile: comment.user.profile,
        },
      }),
    );

    return { comments: commentsWithUser };
  }

  async getArticles(type: IGetArticlesType, getArticlesData: GetArticlesData): Promise<Article[]> {
    let articles: Article[] = [];

    /**
     * 카테고리로 게시글을 조회
     */
    if (type === GetArticlesType.category) {
      const { parent, child } = getArticlesData;
      const findCategoryId = async (categoryParam: string | null): Promise<number | null> => {
        if (!categoryParam) return null;
        const category = await this.categoryService.findOne({ param: categoryParam }, { includeDeleted: false });
        return category ? category.id : null;
      };

      const [parentId, childId] = await Promise.all([findCategoryId(parent), findCategoryId(child)]);

      /** 부모, 자식 아이디가 모두 없다면 모든 게시글 목록을 반환 */
      if (!parentId && !childId) {
        articles = await this.articleRepository.findMany({}, { includeDeleted: false });
        return articles;
      }

      /** childId가 없을경우 parentId를 기준으로 게시글을 조회함 */
      const categoryId = childId || parentId;
      const articleCategories = await this.articleCategoryService.findMany({ categoryId }, { includeDeleted: false });

      if (!articleCategories.length) return articles;

      const articleIds = Array.from(new Set(articleCategories.map((ac) => ac.articleId)));
      articles = await this.articleRepository.findManyByIds(articleIds, { includeDeleted: false });
    } else if (type === GetArticlesType.popular) {
      /** 인기 게시글은 좋아요 수 기준으로 지정 */
      articles = await this.articleRepository.findManyOrderByLikeCount({
        includeDeleted: false,
        ...(getArticlesData?.limit && { count: getArticlesData.limit }),
      });
    } else if (type === GetArticlesType.recent) {
      /** 최신 게시글은 생성 시간 기준으로 지정 */
      articles = await this.articleRepository.findManyOrderByCreateAt(
        {},
        { includeDeleted: false, ...(getArticlesData?.limit && { count: getArticlesData.limit }) },
      );
    } else if (type === GetArticlesType.recommended) {
      // TODO: 태그 기반으로 추천 게시글 로직 만들기
      articles = await this.articleRepository.findManyOrderByCreateAt({}, { includeDeleted: false });
    }

    return articles;
  }

  async toggleArticleLike(userId: string, articleId: string): Promise<ResponseToggleArticleLikeDto> {
    const article = await this.articleRepository.findOne({ id: articleId }, { includeDeleted: false });
    if (!article) throw new ArticleNotFoundException();

    const { isLiked } = await this.prisma.$transaction(async (tx) => {
      const toggleLikeResult = await this.articleLikeService.toggleLike(userId, articleId, tx);

      if (toggleLikeResult.isLiked) {
        await this.articleRepository.update(articleId, { likeCount: article.likeCount + 1 }, tx);
      } else {
        await this.articleRepository.update(articleId, { likeCount: article.likeCount - 1 }, tx);
      }

      return toggleLikeResult;
    });

    return {
      isLiked,
      likeCount: isLiked ? article.likeCount + 1 : article.likeCount - 1,
    };
  }

  async increaseViewCount(articleId: string): Promise<number> {
    const article = await this.articleRepository.findOne({ id: articleId }, { includeDeleted: false });
    if (!article) throw new ArticleNotFoundException();

    const updatedArticle = await this.articleRepository.update(articleId, { viewCount: article.viewCount + 1 });
    return updatedArticle.viewCount;
  }

  async deleteArticle(articleId: string): Promise<void> {
    const article = await this.articleRepository.findOne({ id: articleId }, { includeDeleted: false });
    if (!article) throw new ArticleNotFoundException();

    // 댓글 삭제
    const articleComments = await this.articleCommentService.getArticleComments(articleId);
    const commentIds = articleComments.map((comment) => comment.id);

    await this.prisma.$transaction(async (tx) => {
      await Promise.all([
        this.articleCommentService.deleteComments(commentIds, tx),
        this.articleTagService.deleteMany({ articleId }, tx),
        this.articleCategoryService.deleteByArticleId(articleId, tx),
        this.articleRepository.delete(articleId, tx),
      ]);
    });
  }

  async updateArticle(articleId: string, dto: UpdateArticleDto): Promise<void> {
    const article = await this.articleRepository.findOne({ id: articleId }, { includeDeleted: false });
    if (!article) throw new ArticleNotFoundException();

    await this.prisma.$transaction(async (tx) => {
      const promises = [];

      /** 썸네일 이미지가 변경된경우 썸네일 이미지 업데이트 */
      if (dto?.thumbnail) {
        const thumbnailUrl = generateThumbnail(articleId, dto.thumbnail);

        await this.awsS3Service.copyFile({
          from: S3Bucket.PRESIGNED,
          to: S3Bucket.STATIC,
          originalFileNames: [dto.thumbnail],
          fileNames: [`${S3BucketDirectory.ARTICLE_IMAGE}/${articleId}/${dto.thumbnail}`],
        });

        promises.push(this.articleRepository.update(articleId, { thumbnail: thumbnailUrl }, tx));
      }

      /** 이미지가 추가된 경우 이미지 업데이트 */
      if (dto?.newImages?.length) {
        const imagesWithDirectory = dto.newImages.map(
          (image) => `${S3BucketDirectory.ARTICLE_IMAGE}/${articleId}/${image}`,
        );
        await this.awsS3Service.copyFile({
          from: S3Bucket.PRESIGNED,
          to: S3Bucket.STATIC,
          originalFileNames: dto.newImages,
          fileNames: imagesWithDirectory,
        });
      }

      promises.push(
        this.articleRepository.update(
          articleId,
          {
            ...(dto?.title && { title: dto.title }),
            ...(dto?.summary && { summary: dto.summary }),
            ...(dto?.content && { content: replaceContentImageUrl(articleId, dto.content) }),
          },
          tx,
        ),
      );

      await Promise.all(promises);
    });
  }

  async getArticleIds(): Promise<string[]> {
    const articles = await this.articleRepository.findMany({}, { includeDeleted: false });
    return articles.map((article) => article.id);
  }
}
