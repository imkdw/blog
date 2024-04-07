import request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import prisma from '../../../../../prisma/__test__/prisma';

import { clearDatabase, createTestingApp } from '../../../__test__/helper/test-helper';
import { createTag } from '../helper/tag.test-helper';

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

  describe('■ 단어로 태그목록 검색', () => {
    describe('□ 매치되는 태그가 존재하는 경우', () => {
      const tagName = faker.lorem.word(100);

      beforeAll(async () => {
        await clearDatabase();
        await createTag({ tagName });
      });

      it('태그 목록을 반환한다', () =>
        request(app.getHttpServer())
          .get(`/v1/tags/search/${tagName}`)
          .expect(HttpStatus.OK)
          .expect(({ body }) => {
            expect(body.data.tags).toHaveLength(1);
            expect(body.data.tags[0].name).toBe(tagName);
          }));
    });
    describe('□ 매치되는 태그가 없는 경우', () => {
      const tagName = faker.lorem.word(100);

      beforeAll(async () => {
        await clearDatabase();
      });

      it('빈 배열을 반환한다', () =>
        request(app.getHttpServer())
          .get(`/v1/tags/search/${tagName}`)
          .expect(HttpStatus.OK)
          .expect(({ body }) => {
            expect(body.data.tags).toHaveLength(0);
          }));
    });
  });
});
