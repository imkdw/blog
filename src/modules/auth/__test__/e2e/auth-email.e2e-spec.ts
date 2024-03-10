import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import prisma from '../../../../../prisma/__test__/prisma';

import { clearDatabase, createTestingApp } from '../../../__test__/helper/test-helper';
import { RequestSendVerifyCodeDto, RequestVerifyCodeValidationDto } from '../../dto/request/auth-email.dto';
import { IEmailService } from '../../../../infra/email/interfaces/email.interface';
import { createEmailVerification } from '../helper/auth.test-helper';

describe('이메일 인증 테스트 (e2e)', () => {
  let app: INestApplication;
  let emailServiceMock: IEmailService;

  beforeAll(async () => {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    const { app: _app, emailServiceMock: _emailServiceMock } = await createTestingApp();
    app = _app;
    emailServiceMock = _emailServiceMock;
  });

  afterAll(async () => {
    await app.close();
    await prisma.$disconnect();
  });

  describe('■ 인증메일 발송', () => {
    describe('□ 인증메일 발송 성공', () => {
      let res: request.Response;
      const requestDto: RequestSendVerifyCodeDto = { email: faker.internet.email() };

      beforeAll(async () => {
        await clearDatabase();

        res = await request(app.getHttpServer()).post('/v1/auth/email').send(requestDto);
      });

      it(`emailService.send 메소드가 호출된다`, () => {
        expect(emailServiceMock.send).toHaveBeenCalledTimes(1);
      });

      it('데이터베이스에 인증메일 정보가 저장된다', async () => {
        const emailVerification = await prisma.emailVerification.findFirst({
          where: { email: requestDto.email },
        });

        expect(emailVerification).not.toBeNull();
      });

      it(`HTTP ${HttpStatus.CREATED} 상태코드를 반환한다.`, () => {
        expect(res.status).toBe(HttpStatus.CREATED);
      });
    });
  });

  describe('■ 인증코드 검증', () => {
    describe('□ 인증코드 검증 성공', () => {
      let res: request.Response;
      const requestDto: RequestVerifyCodeValidationDto = {
        code: '',
        verificationId: 0,
      };

      beforeAll(async () => {
        await clearDatabase();

        const { code, id } = await createEmailVerification();
        requestDto.code = code;
        requestDto.verificationId = id;

        res = await request(app.getHttpServer()).post('/v1/auth/email/verify').send(requestDto);
      });

      it('데이터베이스에 저장된 verifiedAt 날짜가 변경된다', async () => {
        const emailVerification = await prisma.emailVerification.findFirst({
          where: { id: requestDto.verificationId },
        });

        expect(emailVerification).not.toBeNull();
        expect(emailVerification.verifiedAt).not.toBeNull();
      });

      it('인증코드 검증 성공여부를 반환한다', () => {
        expect(res.body.data.isVerified).toBe(true);
      });

      it(`HTTP ${HttpStatus.CREATED} 상태코드를 반환한다.`, () => {
        expect(res.status).toBe(HttpStatus.CREATED);
      });
    });
  });
});
