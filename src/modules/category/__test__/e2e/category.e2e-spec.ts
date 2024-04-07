import request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import prisma from '../../../../../prisma/__test__/prisma';

import { clearDatabase, createTestingApp } from '../../../__test__/helper/test-helper';
import { createCategory } from '../helper/category.test-helper';
import { createUser } from '../../../user/__test__/helper/user.test-helper';
import { UserRoles } from '../../../user/domain/entities/user-role.entity';
import { UserSignupChannels } from '../../../user/domain/entities/user-signup-channel.entity';
import { createJwtToken } from '../../../auth/__test__/helper/auth.test-helper';

describe('유저 테스트 (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const { app: _app } = await createTestingApp();
    app = _app;
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  describe('■ 카테고리 목록 조회', () => {
    const parentCategoryData = { name: faker.string.nanoid(20), param: faker.string.nanoid(20) };
    const childCategoryData = { name: faker.string.nanoid(20), param: faker.string.nanoid(20) };

    describe('□ 조회 성공', () => {
      beforeAll(async () => {
        await clearDatabase();
        const parentCategory = await createCategory(parentCategoryData);
        await createCategory({ parentId: parentCategory.id, ...childCategoryData });
      });

      it('카테고리 목록을 반환한다', () =>
        request(app.getHttpServer())
          .get('/v1/categories')
          .expect(HttpStatus.OK)
          .expect(({ body }) => {
            expect(body.data.categories).toHaveLength(1);
            expect(body.data.categories[0].name).toBe(parentCategoryData.name);
            expect(body.data.categories[0].children).toHaveLength(1);
            expect(body.data.categories[0].children[0].name).toBe(childCategoryData.name);
          }));
    });
  });

  describe('■ 카테고리 생성', () => {
    describe('□ 일반 유저의 카테고리 생성요청', () => {
      let tokenCookie: string;
      beforeAll(async () => {
        await clearDatabase();
        const createdUser = await createUser({ role: UserRoles.NORMAL, signupChannel: UserSignupChannels.COMMON });
        const { tokenCookie: _tokenCookie } = createJwtToken({ userId: createdUser.id });
        tokenCookie = _tokenCookie;
      });

      it('403 에러를반환한다', () =>
        request(app.getHttpServer())
          .post('/v1/categories')
          .set('Cookie', tokenCookie)
          .send({ name: faker.string.nanoid(20), param: faker.string.nanoid(20) })
          .expect(HttpStatus.FORBIDDEN));
    });
    describe('□ 부모 카테고리 생성', () => {
      const parentCategoryData = { name: faker.string.nanoid(20), param: faker.string.nanoid(20) };
      let tokenCookie: string;

      beforeAll(async () => {
        await clearDatabase();
        const createdUser = await createUser({ role: UserRoles.ADMIN, signupChannel: UserSignupChannels.COMMON });
        const { tokenCookie: _tokenCookie } = createJwtToken({ userId: createdUser.id });
        tokenCookie = _tokenCookie;
      });

      it('카테고리를 생성한다', () =>
        request(app.getHttpServer())
          .post('/v1/categories')
          .set('Cookie', tokenCookie)
          .send(parentCategoryData)
          .expect(HttpStatus.CREATED)
          .expect(({ body }) => {
            expect(body.data.name).toBe(parentCategoryData.name);
            expect(body.data.param).toBe(parentCategoryData.param);
          }));

      it('DB에 저장됬는지 확인한다', async () => {
        const categories = await prisma.category.findMany();
        expect(categories).toHaveLength(1);
        expect(categories[0].name).toBe(parentCategoryData.name);
      });
    });

    describe('□ 자식 카테고리 생성', () => {
      const childCategoryData = { name: faker.string.nanoid(20), param: faker.string.nanoid(20) };
      let parentCategoryId: number;
      let tokenCookie: string;

      beforeAll(async () => {
        await clearDatabase();
        const parentCategory = await createCategory({});
        parentCategoryId = parentCategory.id;
        const createdUser = await createUser({ role: UserRoles.ADMIN, signupChannel: UserSignupChannels.COMMON });
        const { tokenCookie: _tokenCookie } = createJwtToken({ userId: createdUser.id });
        tokenCookie = _tokenCookie;
      });

      it('카테고리를 생성한다', () =>
        request(app.getHttpServer())
          .post('/v1/categories')
          .set('Cookie', tokenCookie)
          .send({ ...childCategoryData, parentId: parentCategoryId })
          .expect(HttpStatus.CREATED)
          .expect(({ body }) => {
            expect(body.data.name).toBe(childCategoryData.name);
            expect(body.data.param).toBe(childCategoryData.param);
          }));

      it('DB에 저장됬는지 확인한다', async () => {
        const categories = await prisma.category.findMany();
        expect(categories).toHaveLength(2);
        expect(categories[1].name).toBe(childCategoryData.name);
      });
    });
  });
});
