// import request from 'supertest';
// import { HttpStatus, INestApplication } from '@nestjs/common';
// import { faker } from '@faker-js/faker';
// import prisma from '../../../../../prisma/__test__/prisma';

// import { createTestingApp } from '../../../__test__/helper/test-helper';

// describe('일반 인증 테스트 (e2e)', () => {
//   let app: INestApplication;

//   beforeAll(async () => {
//     // eslint-disable-next-line @typescript-eslint/naming-convention
//     const { app: _app } = await createTestingApp();
//     app = _app;
//   });

//   afterAll(async () => {
//     await app.close();
//     await prisma.$disconnect();
//   });

//   describe('■ 토큰 갱신', () => {
//     describe('□ 쿠키에 리프레쉬 토큰이 전달되지 않은 경우', () => {
//       let res: request.Response;
//       let requestSignupDto: RequestCommonSignupDto;

//       beforeAll(async () => {
//         await clearDatabase();
//         const { email } = await createUser({ role: UserRoles.NORMAL, signupChannel: UserSignupChannels.COMMON });

//         requestSignupDto = {
//           email,
//           nickname: generateNickname('valid'),
//           password: generatePassword('valid'),
//         };

//         res = await request(app.getHttpServer()).post('/v1/auth/common/signup').send(requestSignupDto);
//       });

//       it(`이메일이 중복되어 회원가입에 실패한다. ${CONFICT_EXCEPTION_CODES.EXIST_EMAIL} 에러코드를 반환한다.`, () => {
//         expect(res.body.error.errorCode).toBe(CONFICT_EXCEPTION_CODES.EXIST_EMAIL);
//         expect(res.body.error.timestamp).toBeDefined();
//       });

//       it(`HTTP ${HttpStatus.CONFLICT} 상태코드를 반환한다.`, () => {
//         expect(res.status).toBe(HttpStatus.CONFLICT);
//       });
//     });
//   });
// });
