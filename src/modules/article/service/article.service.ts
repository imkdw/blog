import { Inject, Injectable } from '@nestjs/common';
import { ArticleRepositoryKey, IArticleRepository, IArticleService } from '../interfaces/article.interface';
import Article from '../domain/entities/article.entity';
import { CreateArticleDto } from '../dto/internal/article.dto';
import { ExistArticleIdException } from '../../../common/exceptions/409';
import { CategoryServiceKey, ICategoryService } from '../../category/interfaces/category.interface';
import { ArticleNotFoundException, CategoryNotFoundException } from '../../../common/exceptions/404';
import { ITagService, TagServiceKey } from '../../tag/interfaces/tag.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import CreatingArticle from '../domain/models/creating-article.model';
import { ArticleTagServiceKey, IArticleTagService } from '../../article-tag/interfaces/article-tag.interface';
import Tag from '../../tag/domain/entities/tag.entity';
import { ArticleCommentServiceKey, IArticleCommentService } from '../interfaces/article-comment.interface';
import ArticleComment from '../domain/entities/article-comment.entity';
import { CreateCommentDto } from '../dto/internal/article-comment.dto';
import { GetCommentsContent, ResponseGetCommentsDto } from '../dto/response/article-comment.dto';

@Injectable()
export default class ArticleService implements IArticleService {
  constructor(
    @Inject(ArticleRepositoryKey) private readonly articleRepository: IArticleRepository,
    @Inject(CategoryServiceKey) private readonly categoryService: ICategoryService,
    @Inject(TagServiceKey) private readonly tagService: ITagService,
    @Inject(ArticleTagServiceKey) private readonly articleTagService: IArticleTagService,
    @Inject(ArticleCommentServiceKey) private readonly articleCommentService: IArticleCommentService,
    private readonly prisma: PrismaService,
  ) {}

  async createArticle(userId: string, dto: CreateArticleDto): Promise<Article> {
    // 아이디 중복검사
    const existArticle = await this.articleRepository.findOne({ id: dto.id }, { includeDeleted: true });
    if (existArticle) throw new ExistArticleIdException(dto.id);

    // 카테고리 아이디 존재여부 검사
    const parentCategory = await this.categoryService.findOne({ id: dto.parentCategoryId }, { includeDeleted: false });
    if (!parentCategory) throw new CategoryNotFoundException();

    const childCategory = await this.categoryService.findOne({ id: dto.childCategoryId }, { includeDeleted: false });
    if (!childCategory) throw new CategoryNotFoundException();

    const creatingArticle = new CreatingArticle({ ...dto, userId });

    // 태그 로직
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

      /** 게시글-태그 생성 */
      await this.articleTagService.createMany(article.id, tagIds, tx);

      return article;
    });

    return createdArticle;
  }

  async getArticleDetail(articleId: string): Promise<Article> {
    const article = await this.articleRepository.findOne({ id: articleId }, { includeDeleted: false });
    if (!article) throw new ArticleNotFoundException();

    return article;
  }

  async getArticleTags(articleId: string): Promise<Tag[]> {
    const existArticle = await this.articleRepository.findOne({ id: articleId }, { includeDeleted: false });
    if (!existArticle) throw new ArticleNotFoundException();

    const articleTags = await this.articleTagService.findManyByArticleId(articleId, { includeDeleted: false });
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
      await this.articleRepository.increaseCommentCount(article.id, tx);
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
}
