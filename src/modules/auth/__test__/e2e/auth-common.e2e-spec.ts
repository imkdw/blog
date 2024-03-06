import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import request, { Response } from 'supertest';
import { faker } from '@faker-js/faker';

import AppModule from '../../../../app.module';
import RequestSignUpDto from '../../types/dto/request/common-sign-up.dto';
import { generateNickname, generatePassword } from '../../../user/__test__/utils/user.test-util';
import { clearDatabase } from '../../../../__test__/helpers/common.auth-helper';

describe('일반 인증 E2E 테스트', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('일반 회원가입', () => {
    describe('회원가입 성공', () => {
      beforeAll(async () => {
        clearDatabase();
      });

      let res: Response;
      const dto: RequestSignUpDto = {
        email: faker.internet.email(),
        nickname: generateNickname('valid'),
        password: generatePassword('valid'),
      };

      it('HTTP 201 코드를 반환한다', async () => {
        res = await request(app.getHttpServer()).post('/auth/common/sign-up').send(dto);
        expect(res.status).toBe(HttpStatus.CREATED);
      });
    });
  });
});
