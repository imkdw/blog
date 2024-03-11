import * as request from 'supertest';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { faker } from '@faker-js/faker';
import prisma from '../../../../../prisma/__test__/prisma';

import { clearDatabase, createTestingApp } from '../../../__test__/helper/test-helper';
import { createUser } from '../../../user/__test__/helper/user.test-helper';
import { UserRoles } from '../../../user/domain/entities/user-role.entity';
import { UserSignupChannels } from '../../../user/domain/entities/user-signup-channel.entity';
import { RequestCommonSigninDto, RequestCommonSignupDto } from '../../dto/request/auth-common.dto';
import { generateNickname, generatePassword } from '../../../user/__test__/utils/user.test-util';
import { CONFICT_EXCEPTION_CODES } from '../../../../common/exceptions/409';
import { UNAUTHORIZED_EXCEPTION_CODES } from '../../../../common/exceptions/401';

describe('일반 인증 테스트 (e2e)', () => {
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

  describe('■ 일반 회원가입', () => {
    describe('□ 이메일이 중복된 유저의 회원가입 요청', () => {
      let res: request.Response;
      let requestSignupDto: RequestCommonSignupDto;

      beforeAll(async () => {
        await clearDatabase();
        const { email } = await createUser({ role: UserRoles.NORMAL, signupChannel: UserSignupChannels.COMMON });

        requestSignupDto = {
          email,
          nickname: generateNickname('valid'),
          password: generatePassword('valid'),
        };

        res = await request(app.getHttpServer()).post('/v1/auth/common/signup').send(requestSignupDto);
      });

      it(`이메일이 중복되어 회원가입에 실패한다. ${CONFICT_EXCEPTION_CODES.EXIST_EMAIL} 에러코드를 반환한다.`, () => {
        expect(res.body.error.errorCode).toBe(CONFICT_EXCEPTION_CODES.EXIST_EMAIL);
        expect(res.body.error.timestamp).toBeDefined();
      });

      it(`HTTP ${HttpStatus.CONFLICT} 상태코드를 반환한다.`, () => {
        expect(res.status).toBe(HttpStatus.CONFLICT);
      });
    });

    describe('□ 닉네임이 중복된 유저의 회원가입 요청', () => {
      let res: request.Response;
      let requestSignupDto: RequestCommonSignupDto;

      beforeAll(async () => {
        await clearDatabase();
        const { nickname } = await createUser({ role: UserRoles.NORMAL, signupChannel: UserSignupChannels.COMMON });

        requestSignupDto = {
          email: faker.internet.email(),
          nickname,
          password: generatePassword('valid'),
        };

        res = await request(app.getHttpServer()).post('/v1/auth/common/signup').send(requestSignupDto);
      });

      it(`닉네임 중복되어 회원가입에 실패한다. ${CONFICT_EXCEPTION_CODES.EXIST_NICKNAME} 에러코드를 반환한다.`, () => {
        expect(res.body.error.errorCode).toBe(CONFICT_EXCEPTION_CODES.EXIST_NICKNAME);
        expect(res.body.error.timestamp).toBeDefined();
      });

      it(`HTTP ${HttpStatus.CONFLICT} 상태코드를 반환한다.`, () => {
        expect(res.status).toBe(HttpStatus.CONFLICT);
      });
    });

    describe('□ 회원가입 성공', () => {
      let res: request.Response;

      const requestSignupDto: RequestCommonSignupDto = {
        email: faker.internet.email(),
        nickname: generateNickname('valid'),
        password: generatePassword('valid'),
      };

      beforeAll(async () => {
        await clearDatabase();

        res = await request(app.getHttpServer()).post('/v1/auth/common/signup').send(requestSignupDto);
      });

      it(`데이터베이스에 유저의 정보가 저장된다.`, async () => {
        const user = await prisma.users.findUnique({ where: { email: requestSignupDto.email } });
        expect(user).toBeDefined();
      });

      it(`회원가입 성공시 생성된 유저의 정보를 반환한다.`, () => {
        expect(res.body.data.email).toBe(requestSignupDto.email);
        expect(res.body.data.nickname).toBe(requestSignupDto.nickname);
        expect(res.body.data.profile).toBeDefined();
        expect(res.body.data.role).toBe(UserRoles.NORMAL);
        expect(res.body.data.accessToken).toBeDefined();
      });

      it('응답 헤더 Set-Cookie를 통해서 리프레쉬 토큰이 설정된다.', () => {
        expect(res.header['set-cookie'][0]).toMatch(/refreshToken/);
      });

      it(`회원가입 성공시 ${HttpStatus.CREATED} 상태코드를 반환한다.`, () => {
        expect(res.status).toBe(HttpStatus.CREATED);
      });
    });
  });

  describe('■ 일반 로그인', () => {
    describe('□ 존재하지 않는 이메일로 로그인 시도시', () => {
      let res: request.Response;
      let requestSigninDto: RequestCommonSigninDto;

      beforeAll(async () => {
        await clearDatabase();

        requestSigninDto = {
          email: faker.internet.email(),
          password: generatePassword('valid'),
        };

        res = await request(app.getHttpServer()).post('/v1/auth/common/signin').send(requestSigninDto);
      });

      it(`이메일이 존재하지 않아 로그인에 실패한다. ${UNAUTHORIZED_EXCEPTION_CODES.INVALID_CRENENTIAL} 에러코드를 반환한다.`, () => {
        expect(res.body.error.errorCode).toBe(UNAUTHORIZED_EXCEPTION_CODES.INVALID_CRENENTIAL);
        expect(res.body.error.timestamp).toBeDefined();
      });

      it(`HTTP ${HttpStatus.UNAUTHORIZED} 상태코드를 반환한다.`, () => {
        expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
      });
    });

    describe('□ 비밀번호가 일치하지 않는 로그인 시도시', () => {
      let res: request.Response;
      let requestSigninDto: RequestCommonSigninDto;

      beforeAll(async () => {
        await clearDatabase();
        const { email } = await createUser({ role: UserRoles.NORMAL, signupChannel: UserSignupChannels.COMMON });

        requestSigninDto = {
          email,
          password: generatePassword('valid'),
        };

        res = await request(app.getHttpServer()).post('/v1/auth/common/signin').send(requestSigninDto);
      });

      it(`비밀번호가 일치하지않아 로그인에 실패한다. ${UNAUTHORIZED_EXCEPTION_CODES.INVALID_CRENENTIAL} 에러코드를 반환한다.`, () => {
        expect(res.body.error.errorCode).toBe(UNAUTHORIZED_EXCEPTION_CODES.INVALID_CRENENTIAL);
        expect(res.body.error.timestamp).toBeDefined();
      });

      it(`HTTP ${HttpStatus.UNAUTHORIZED} 상태코드를 반환한다.`, () => {
        expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
      });
    });

    describe('□ OAUth로 가입한 유저가 일반 로그인 시도시', () => {
      let res: request.Response;

      beforeAll(async () => {
        await clearDatabase();

        const { email, password } = await createUser({
          role: UserRoles.NORMAL,
          signupChannel: UserSignupChannels.OAUTH,
        });

        const requestSigninDto: RequestCommonSigninDto = { email, password };

        res = await request(app.getHttpServer()).post('/v1/auth/common/signin').send(requestSigninDto);
      });

      it(`□ OAUth로 가입한 유저가 로그인 시도시 ${UNAUTHORIZED_EXCEPTION_CODES.OAUTH_USER_SIGNIN_WITH_COMMON} 에러코드를 반환한다.`, () => {
        expect(res.body.error.errorCode).toBe(UNAUTHORIZED_EXCEPTION_CODES.OAUTH_USER_SIGNIN_WITH_COMMON);
        expect(res.body.error.timestamp).toBeDefined();
      });

      it(`HTTP ${HttpStatus.UNAUTHORIZED} 상태코드를 반환한다.`, () => {
        expect(res.status).toBe(HttpStatus.UNAUTHORIZED);
      });
    });

    describe('로그인 성공', () => {
      let res: request.Response;

      let requestSigninDto: RequestCommonSigninDto;

      beforeAll(async () => {
        await clearDatabase();

        const { email, password } = await createUser({
          role: UserRoles.NORMAL,
          signupChannel: UserSignupChannels.COMMON,
        });

        requestSigninDto = { email, password };

        res = await request(app.getHttpServer()).post('/v1/auth/common/signin').send(requestSigninDto);
      });

      it(`로그인 성공시 생성된 유저의 정보를 반환한다.`, () => {
        expect(res.body.data.email).toBe(requestSigninDto.email);
        expect(res.body.data.nickname).toBeDefined();
        expect(res.body.data.profile).toBeDefined();
        expect(res.body.data.role).toBe(UserRoles.NORMAL);
        expect(res.body.data.accessToken).toBeDefined();
      });

      it('응답 헤더 Set-Cookie를 통해서 리프레쉬 토큰이 설정된다.', () => {
        expect(res.header['set-cookie'][0]).toMatch(/refreshToken/);
      });

      it(`로그인 성공시 ${HttpStatus.CREATED} 상태코드를 반환한다.`, () => {
        expect(res.status).toBe(HttpStatus.CREATED);
      });
    });
  });
});
