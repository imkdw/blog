import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import AppModule from '../../../app.module';

describe('일반 인증 E2E 테스트', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('카테고리 생성', () => {
    it('성공', async () => {
      const response = await request(app.getHttpServer())
        .post('/category')
        .send({
          parentId: 1,
          name: '카테고리 이름',
        })
        .expect(HttpStatus.CREATED);

      return response;
    });
  });
});
