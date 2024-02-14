import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import AppModule from '../../../../app.module';
import { createUser } from '../../../../__test__/helpers/auth.test-helper';

describe('일반 인증 E2E 테스트', () => {
  let app: INestApplication;

  const createdUser = {
    email: 'before@user.com',
    nickname: 'before',
    password: 'Password1234!@',
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    await createUser(app, createdUser);
  });

  describe('회원가입', () => {
    it('성공', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/common/sign-up')
        .send({
          email: 'test@example.com',
          nickname: 'testUser',
          password: 'Password1234!@',
          rePassword: 'Password1234!@',
        })
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual({
        email: 'test@example.com',
        accessToken: expect.any(String),
      });

      expect(response.headers['set-cookie']).toBeDefined();
      expect(response.headers['set-cookie'][0]).toContain('refreshToken');
    });
  });

  describe('로그인', () => {
    it('성공', async () => {
      const response = await request(app.getHttpServer())
        .post('/auth/common/sign-in')
        .send({
          email: createdUser.email,
          password: createdUser.password,
        })
        .expect(HttpStatus.CREATED);

      expect(response.body).toEqual({
        email: createdUser.email,
        accessToken: expect.any(String),
      });

      expect(response.headers['set-cookie']).toBeDefined();
      expect(response.headers['set-cookie'][0]).toContain('refreshToken');
    });
  });
});
