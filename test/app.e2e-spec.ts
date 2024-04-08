import { HttpStatus, INestApplication } from '@nestjs/common';
import request from 'supertest';
import { createTestingApp } from '../src/modules/__test__/helper/test-helper';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const { app: _app } = await createTestingApp();
    app = _app;
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => request(app.getHttpServer()).get('/').expect(HttpStatus.OK).expect({ data: 'hello' }));
});
