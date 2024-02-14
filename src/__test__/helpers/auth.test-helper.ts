import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';

interface ICreateUser {
  email: string;
  password: string;
  nickname: string;
}
// eslint-disable-next-line import/prefer-default-export
export async function createUser(app: INestApplication, user: ICreateUser) {
  await request(app.getHttpServer())
    .post('/auth/common/sign-up')
    .send({
      ...user,
      rePassword: user.password,
    })
    .expect(HttpStatus.CREATED);
}
