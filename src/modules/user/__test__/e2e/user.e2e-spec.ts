import request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import prisma from '../../../../../prisma/__test__/prisma';

import { clearDatabase, createTestingApp } from '../../../__test__/helper/test-helper';
import { CheckDuplicateType } from '../../enums/user.enum';
import { createUser } from '../helper/user.test-helper';
import { UserRoles } from '../../domain/entities/user-role.entity';
import { UserSignupChannels } from '../../domain/entities/user-signup-channel.entity';
import { generateNickname } from '../utils/user.test-util';

describe('유저 테스트 (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { app: _app } = await createTestingApp();
    app = _app;
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  describe('■ 유저 데이터 중복체크', () => {
    describe('□ 중복된 이메일', () => {
      let res: request.Response;

      beforeAll(async () => {
        await clearDatabase();

        const { email } = await createUser({ role: UserRoles.NORMAL, signupChannel: UserSignupChannels.COMMON });

        res = await request(app.getHttpServer()).get(
          `/v1/users/duplicate?type=${CheckDuplicateType.EMAIL}&value=${email}`,
        );
      });

      it('isDuplicate에 true를 반환한다', () => {
        expect(res.body.data.isDuplicate).toBe(true);
      });

      it('HTTP 200 코드를 반환한다', () => {
        expect(res.status).toBe(HttpStatus.OK);
      });
    });

    describe('□ 중복된 닉네임', () => {
      let res: request.Response;

      beforeAll(async () => {
        await clearDatabase();

        const { nickname } = await createUser({ role: UserRoles.NORMAL, signupChannel: UserSignupChannels.COMMON });

        res = await request(app.getHttpServer()).get(
          `/v1/users/duplicate?type=${CheckDuplicateType.NICKNAME}&value=${nickname}`,
        );
      });

      it('isDuplicate에 true를 반환한다', () => {
        expect(res.body.data.isDuplicate).toBe(true);
      });

      it('HTTP 200 코드를 반환한다', () => {
        expect(res.status).toBe(HttpStatus.OK);
      });
    });

    describe('□ 중복되지 않은 이메일', () => {
      let res: request.Response;

      beforeAll(async () => {
        await clearDatabase();

        res = await request(app.getHttpServer()).get(
          `/v1/users/duplicate?type=${CheckDuplicateType.EMAIL}&value=${faker.internet.email()}`,
        );
      });

      it('isDuplicate에 false를 반환한다', () => {
        expect(res.body.data.isDuplicate).toBe(false);
      });

      it('HTTP 200 코드를 반환한다', () => {
        expect(res.status).toBe(HttpStatus.OK);
      });
    });

    describe('□ 중복되지 않은 닉네임', () => {
      let res: request.Response;

      beforeAll(async () => {
        await clearDatabase();

        res = await request(app.getHttpServer()).get(
          `/v1/users/duplicate?type=${CheckDuplicateType.NICKNAME}&value=${generateNickname('valid')}`,
        );
      });

      it('isDuplicate에 false를 반환한다', () => {
        expect(res.body.data.isDuplicate).toBe(false);
      });

      it('HTTP 200 코드를 반환한다', () => {
        expect(res.status).toBe(HttpStatus.OK);
      });
    });
  });
});
