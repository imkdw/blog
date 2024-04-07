import request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import prisma from '../../../../../prisma/__test__/prisma';

import { clearDatabase, createTestingApp } from '../../../__test__/helper/test-helper';
import { createCategory } from '../../../category/__test__/helper/category.test-helper';
import { createArticle } from '../helper/article.test-helper';
import { createArticleCategory } from '../helper/article-category.test-helper';
import { createUser } from '../../../user/__test__/helper/user.test-helper';
import { UserRoles } from '../../../user/domain/entities/user-role.entity';
import { UserSignupChannels } from '../../../user/domain/entities/user-signup-channel.entity';
import { createJwtToken } from '../../../auth/__test__/helper/auth.test-helper';
import { RequestCreateArticleDto } from '../../dto/request/article.dto';
import { CONFICT_EXCEPTION_CODES } from '../../../../common/exceptions/409';
import { NOT_FOUND_EXCEPTION_CODES } from '../../../../common/exceptions/404';
import { IAwsS3Service } from '../../../../infra/aws/interfaces/s3.interface';
import { createArticleLike } from '../helper/article-like.test-helper';
import Article from '../../domain/entities/article.entity';

describe('아티클 테스트 (e2e)', () => {
  let app: INestApplication;
  let awsS3ServiceMock: IAwsS3Service;

  beforeAll(async () => {
    const { app: _app, awsS3ServiceMock: _awsS3ServiceMock } = await createTestingApp();
    app = _app;
    awsS3ServiceMock = _awsS3ServiceMock;
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  describe('■ SEO를 위한 모든 게시글 아이디 조회', () => {
    describe('□ 게시글 아이디 목록 조회 성공', () => {
      const articleId = faker.string.nanoid(20);

      beforeAll(async () => {
        await clearDatabase();
        const createdUser = await createUser({ role: UserRoles.NORMAL, signupChannel: UserSignupChannels.COMMON });
        const createdCategory = await createCategory({ name: faker.string.nanoid(20), param: faker.string.nanoid(20) });
        const craetedArticle = await createArticle({ userId: createdUser.id, articleId });
        await createArticleCategory({ articleId: craetedArticle.id, categoryId: createdCategory.id });
      });

      it('게시글 아이디 목록을 반환한다', () =>
        request(app.getHttpServer())
          .get('/v1/articles/ids')
          .expect(HttpStatus.OK)
          .expect(({ body }) => {
            expect(body.data.articleIds).toHaveLength(1);
            expect(body.data.articleIds[0]).toBe(articleId);
          }));
    });
  });

  describe('■ 게시글 작성', () => {
    describe('□ 일반 유저가 게시글 작성을 시도하는 경우', () => {
      const articleId = faker.string.nanoid(20);
      let tokenCookie: string;

      beforeAll(async () => {
        await clearDatabase();

        const createdUser = await createUser({ role: UserRoles.NORMAL, signupChannel: UserSignupChannels.COMMON });
        const { tokenCookie: _tokenCookie } = createJwtToken({ userId: createdUser.id });
        tokenCookie = _tokenCookie;

        const createdCategory = await createCategory({ name: faker.string.nanoid(20), param: faker.string.nanoid(20) });
        const craetedArticle = await createArticle({ userId: createdUser.id, articleId });
        await createArticleCategory({ articleId: craetedArticle.id, categoryId: createdCategory.id });
      });

      it('403 에러를 반환한다', () => {
        const requestCreateArticleDto: RequestCreateArticleDto = {
          articleId,
          title: faker.string.nanoid(20),
          content: faker.string.nanoid(20),
          thumbnail: faker.image.url(),
          childCategoryId: 1,
          parentCategoryId: 2,
          summary: faker.string.nanoid(20),
          images: [faker.image.url()],
          tags: [faker.string.nanoid(20)],
        };

        return request(app.getHttpServer())
          .post('/v1/articles')
          .set('Cookie', [tokenCookie])
          .send(requestCreateArticleDto)
          .expect(HttpStatus.FORBIDDEN);
      });
    });

    describe('□ 아이디가 중복된 경우', () => {
      const articleId = faker.string.nanoid(20);
      let tokenCookie: string;

      beforeAll(async () => {
        await clearDatabase();

        const createdUser = await createUser({ role: UserRoles.ADMIN, signupChannel: UserSignupChannels.COMMON });
        const { tokenCookie: _tokenCookie } = createJwtToken({ userId: createdUser.id });
        tokenCookie = _tokenCookie;

        const createdCategory = await createCategory({ name: faker.string.nanoid(20), param: faker.string.nanoid(20) });
        const craetedArticle = await createArticle({ userId: createdUser.id, articleId });
        await createArticleCategory({ articleId: craetedArticle.id, categoryId: createdCategory.id });
      });

      it('409 에러를 반환한다', () => {
        const requestCreateArticleDto: RequestCreateArticleDto = {
          articleId,
          title: faker.string.nanoid(20),
          content: faker.string.nanoid(20),
          thumbnail: faker.image.url(),
          childCategoryId: 1,
          parentCategoryId: 2,
          summary: faker.string.nanoid(20),
          images: [faker.image.url()],
          tags: [faker.string.nanoid(20)],
        };

        return request(app.getHttpServer())
          .post('/v1/articles')
          .set('Cookie', [tokenCookie])
          .send(requestCreateArticleDto)
          .expect(HttpStatus.CONFLICT)
          .expect(({ body }) => {
            expect(body.error.errorCode).toBe(CONFICT_EXCEPTION_CODES.EXIST_ARTICLE_ID);
          });
      });
    });

    describe('□ 카테고리가 존재하지 않는경우', () => {
      const articleId = faker.string.nanoid(20);
      let tokenCookie: string;

      beforeAll(async () => {
        await clearDatabase();

        const createdUser = await createUser({ role: UserRoles.ADMIN, signupChannel: UserSignupChannels.COMMON });
        const { tokenCookie: _tokenCookie } = createJwtToken({ userId: createdUser.id });
        tokenCookie = _tokenCookie;
      });

      it('404 에러를 반환한다', () => {
        const requestCreateArticleDto: RequestCreateArticleDto = {
          articleId,
          title: faker.string.nanoid(20),
          content: faker.string.nanoid(20),
          thumbnail: faker.image.url(),
          childCategoryId: 1,
          parentCategoryId: 2,
          summary: faker.string.nanoid(20),
          images: [faker.image.url()],
          tags: [faker.string.nanoid(20)],
        };

        return request(app.getHttpServer())
          .post('/v1/articles')
          .set('Cookie', [tokenCookie])
          .send(requestCreateArticleDto)
          .expect(HttpStatus.NOT_FOUND)
          .expect(({ body }) => {
            expect(body.error.errorCode).toBe(NOT_FOUND_EXCEPTION_CODES.CATEGORY_NOT_FOUND);
          });
      });
    });

    describe('□ 게시글 생성 성공', () => {
      let res: request.Response;
      const articleId = faker.string.nanoid(20);
      let tokenCookie: string;

      const requestDto: Partial<RequestCreateArticleDto> = {
        articleId,
        title: faker.string.nanoid(20),
        content: faker.string.nanoid(20),
        thumbnail: faker.image.url(),
        summary: faker.string.nanoid(20),
        images: [faker.image.url()],
        tags: [faker.string.nanoid(5)],
      };

      beforeAll(async () => {
        await clearDatabase();

        const createdUser = await createUser({ role: UserRoles.ADMIN, signupChannel: UserSignupChannels.COMMON });
        const { tokenCookie: _tokenCookie } = createJwtToken({ userId: createdUser.id });
        tokenCookie = _tokenCookie;

        const createdParentCategory = await createCategory({
          name: faker.string.nanoid(20),
          param: faker.string.nanoid(20),
        });
        const createdChildCategory = await createCategory({
          name: faker.string.nanoid(20),
          param: faker.string.nanoid(20),
          parentId: createdParentCategory.id,
        });

        Object.assign(requestDto, {
          parentCategoryId: createdParentCategory.id,
          childCategoryId: createdChildCategory.id,
        });

        res = await request(app.getHttpServer()).post('/v1/articles').set('Cookie', [tokenCookie]).send(requestDto);
      });

      it.todo('게시글 썸네일 S3 링크를 바꾸는 부분 테스트');
      it.todo('태그 존재/미존재 여부에 따른 테스트');

      it('생성된 게시글 아이디가 반환된다', () => {
        expect(res.body.data.articleId).toBe(articleId);
      });

      it('파일을 복사하는 S3 Service를 2번 호출한다.', () => {
        expect(awsS3ServiceMock.copyFile).toHaveBeenCalledTimes(2);
      });

      it('DB에 게시글이 저장된다', async () => {
        const article = await prisma.articles.findUnique({ where: { id: articleId } });
        expect(article).not.toBeNull();
        expect(article.title).toBe(requestDto.title);
        expect(article.content).toBe(requestDto.content);
        expect(article.summary).toBe(requestDto.summary);
      });

      it('태그 및 게시글-태그가 생성된다', async () => {
        const tag = await prisma.tags.findFirst({ where: { name: requestDto.tags[0] } });
        expect(tag).not.toBeNull();

        const articleTag = await prisma.articleTag.findFirst({ where: { articleId, tagId: tag.id } });
        expect(articleTag).not.toBeNull();
      });

      it('게시글-카테고리 연결된다', async () => {
        const articleCategory = await prisma.articleCategory.findFirst({
          where: { articleId, categoryId: requestDto.childCategoryId },
        });
        expect(articleCategory).not.toBeNull();
      });
    });
  });

  describe('■ 게시글 상세정보 조회', () => {
    describe('□ 게시글을 찾을 수 없는경우', () => {
      beforeAll(async () => {
        await clearDatabase();
      });

      it('404 에러를 반환한다', () =>
        request(app.getHttpServer())
          .get('/v1/articles/1234567890')
          .expect(HttpStatus.NOT_FOUND)
          .expect(({ body }) => {
            expect(body.error.errorCode).toBe(NOT_FOUND_EXCEPTION_CODES.ARTICLE_NOT_FOUND);
          }));
    });

    describe('□ 좋아요를 누른 유저의 게시글 조회', () => {
      const articleId = faker.string.nanoid(20);
      let createdArticle: Article;

      beforeAll(async () => {
        await clearDatabase();

        const createdUser = await createUser({ role: UserRoles.NORMAL, signupChannel: UserSignupChannels.COMMON });
        createdArticle = await createArticle({ userId: createdUser.id, articleId });
        await createArticleLike({ articleId: createdArticle.id, userId: createdUser.id });
      });

      it('게시글 상세정보를 반환한다. isLike가 true로 반환된다', () =>
        request(app.getHttpServer())
          .get(`/v1/articles/${articleId}`)
          .expect(HttpStatus.OK)
          .expect(({ body }) => {
            expect(body.data.articleId).toBe(articleId);
            expect(body.data.thumbnail).toBe(createdArticle.thumbnail);
            expect(body.data.title).toBe(createdArticle.title);
            expect(body.data.summary).toBe(createdArticle.summary);
            expect(body.data.content).toBe(createdArticle.content);
            expect(body.data.viewCount).toBe(createdArticle.viewCount);
            expect(body.data.commentCount).toBe(createdArticle.commentCount);
            expect(body.data.like.isLiked).toBe(true);
          }));
    });

    describe('□ 좋아요를 누르지 않은 유저의 게시글 조회', () => {
      const articleId = faker.string.nanoid(20);
      let createdArticle: Article;

      beforeAll(async () => {
        await clearDatabase();

        const createdUser = await createUser({ role: UserRoles.NORMAL, signupChannel: UserSignupChannels.COMMON });
        createdArticle = await createArticle({ userId: createdUser.id, articleId });
        await createArticleLike({ articleId: createdArticle.id, userId: createdUser.id });
      });

      it('게시글 상세정보를 반환한다. isLike가 false로 반환된다', () =>
        request(app.getHttpServer())
          .get(`/v1/articles/${articleId}`)
          .expect(HttpStatus.OK)
          .expect(({ body }) => {
            expect(body.data.articleId).toBe(articleId);
            expect(body.data.thumbnail).toBe(createdArticle.thumbnail);
            expect(body.data.title).toBe(createdArticle.title);
            expect(body.data.summary).toBe(createdArticle.summary);
            expect(body.data.content).toBe(createdArticle.content);
            expect(body.data.viewCount).toBe(createdArticle.viewCount);
            expect(body.data.commentCount).toBe(createdArticle.commentCount);
            expect(body.data.like.isLiked).toBe(true);
          }));
    });
  });
});
