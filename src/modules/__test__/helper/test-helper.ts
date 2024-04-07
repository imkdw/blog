import { Test, TestingModule } from '@nestjs/testing';
import { VersioningType } from '@nestjs/common';

import prisma from '../../../../prisma/__test__/prisma';
import AppModule from '../../../app.module';
import {
  BcryptConfig,
  DomainConfig,
  IMyConfigService,
  JwtConfig,
  MyConfigServiceKey,
  OAuthConfig,
} from '../../../infra/config/interfaces/my-config.interface';
import { IMyConfig, MyConfig } from '../../../infra/config/enums/my-config.enum';
import { EmailServiceKey, IEmailService } from '../../../infra/email/interfaces/email.interface';

// eslint-disable-next-line import/prefer-default-export
export const createTestingApp = async () => {
  const myConfigServiceMock: IMyConfigService = {
    getConfig: jest.fn().mockImplementation((configType: IMyConfig) => {
      switch (configType) {
        case MyConfig.BCRYPT:
          return {
            salt: 10,
          } as BcryptConfig;
        case MyConfig.DOMAIN:
          return {
            client: 'http://localhost:3000',
            server: 'http://localhost:4000',
          } as DomainConfig;
        case MyConfig.JWT:
          return {
            accessTokenExpiresIn: '1d',
            refreshTokenExpiresIn: '1d',
            secret: 'test',
          } as JwtConfig;
        case MyConfig.OAUTH:
          return {
            github: {
              clientId: 'clientId',
              clientSecret: 'clientSecret',
            },
            kakao: {
              clientId: 'clientId',
            },
          } as OAuthConfig;
        default:
          return null;
      }
    }),
  };

  const emailServiceMock: IEmailService = { send: jest.fn() };

  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  })
    .overrideProvider(MyConfigServiceKey)
    .useValue(myConfigServiceMock)
    .overrideProvider(EmailServiceKey)
    .useValue(emailServiceMock)
    .compile();

  const app = moduleFixture.createNestApplication();

  app.enableVersioning({ type: VersioningType.URI });

  app.enableCors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  });

  await app.init();

  return { app, emailServiceMock };
};

export const clearDatabase = async () => {
  const EXCLUDE_TABLES = ['UserSignupChannel', 'UserRole', 'oAuthProvider'];

  const tables: { TABLE_NAME?: string; table_name: string }[] =
    await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_schema = 'imkdw_dev';`;

  await prisma.$transaction(async (tx) => {
    await tx.$executeRaw`SET foreign_key_checks = 0;`;

    const deleteTablePromises = tables
      .filter((table) => {
        /**
         * DB 설정에 따라서 테이블명이 모두 소문자 또는 prisma.schema에 정의된 테이블 형식으로 반환된다.
         * 모든 테이블이름을 소문자로 변경하고 특정 테이블은 초기화 대상에서 제외시킨다
         */
        const lowerCaseTables = EXCLUDE_TABLES.map((excludeTable) => excludeTable.toLowerCase());
        const lowerCaseTableName = table?.TABLE_NAME?.toLowerCase() || table?.table_name?.toLowerCase();
        return !lowerCaseTables.includes(lowerCaseTableName);
      })
      .map(async (table) => {
        await tx.$executeRawUnsafe(`DELETE FROM ${table?.TABLE_NAME || table?.table_name};`);
      });
    await Promise.all(deleteTablePromises);

    await tx.$executeRaw`SET foreign_key_checks = 1;`;
  });
};
