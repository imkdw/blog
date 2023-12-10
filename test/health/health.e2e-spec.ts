import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import AppModule from '../../src/app.module';

describe('HealthController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('[GET] /health', () => {
    it('헬스체크 성공', () => {
      const defaultHealthCheckReturn = {
        status: 'ok',
        info: {},
        error: {},
        details: {},
      };

      return request(app.getHttpServer()).get('/health').expect(HttpStatus.OK).expect(defaultHealthCheckReturn);
    });
  });
});
