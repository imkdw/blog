/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { faker } from '@faker-js/faker';

import {
  IOAuthService,
  OAuthDataRepositoryKey,
  OAuthProviderRepositoryKey,
  OAuthServiceKey,
} from '../../interfaces/oauth.interface';
import OAuthService from '../../services/oauth.service';
import MyApiServiceStub from '../../../../__test__/stubs/my-api.service.stub';
import { MyApiServiceKey } from '../../../../infra/api/interfaces/my-api.interface';
import OAuthProviderRepositoryStub from '../stubs/oauth-provider.repository.stub';
import OAuthDataRepositoryStub from '../stubs/oauth-data.repository.stub';
import UserServiceStub from '../../../user/__test__/services/user.service.stub';
import { UserServiceKey } from '../../../user/interfaces/user.interface';
import UserRoleServiceStub from '../../../user/__test__/services/user-role.service.stub';
import UserSignupChannelServiceStub from '../../../user/__test__/services/user-signup-channel.service.stub';
import { UserRoleServiceKey } from '../../../user/interfaces/user-role.interface';
import { UserSignupChannelServiceKey } from '../../../user/interfaces/user-signup-channel.interface';
import MyJwtServiceStub from '../stubs/my-jwt.service.stub';
import { MyJwtServiceKey } from '../../interfaces/my-jwt.interface';
import PrismaService from '../../../../infra/database/prisma/service/prisma.service';
import MyConfigServiceStub from '../../../__test__/stubs/my-config.service.stub';
import { MyConfigServiceKey } from '../../../../infra/config/interfaces/my-config.interface';
import { ProcessOAuthDto } from '../../dto/internal/oauth.dto';
import { OAuthFailureException } from '../../../../common/exceptions/401';
import { OAuthProviderNotFoundException } from '../../../../common/exceptions/404';
import { OAuthProvider } from '../../enums/auth.enum';

describe('OAuthService', () => {
  let oAuthService: IOAuthService;
  let myApiService: MyApiServiceStub;
  let myConfigService: MyConfigServiceStub;
  let oAuthProviderRepository: OAuthProviderRepositoryStub;
  let oAuthDataRepository: OAuthDataRepositoryStub;
  let userService: UserServiceStub;
  let userRoleService: UserRoleServiceStub;
  let userSigupChannelService: UserSignupChannelServiceStub;
  let myJwtService: MyJwtServiceStub;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: OAuthServiceKey,
          useClass: OAuthService,
        },
        {
          provide: MyApiServiceKey,
          useClass: MyApiServiceStub,
        },
        {
          provide: MyConfigServiceKey,
          useClass: MyConfigServiceStub,
        },
        {
          provide: UserServiceKey,
          useClass: UserServiceStub,
        },
        {
          provide: UserRoleServiceKey,
          useClass: UserRoleServiceStub,
        },
        {
          provide: UserSignupChannelServiceKey,
          useClass: UserSignupChannelServiceStub,
        },
        {
          provide: MyJwtServiceKey,
          useClass: MyJwtServiceStub,
        },
        {
          provide: OAuthProviderRepositoryKey,
          useClass: OAuthProviderRepositoryStub,
        },
        {
          provide: OAuthDataRepositoryKey,
          useClass: OAuthDataRepositoryStub,
        },
        {
          provide: PrismaService,
          useValue: {},
        },
      ],
    }).compile();

    oAuthService = module.get<IOAuthService>(OAuthServiceKey);
    myApiService = module.get<MyApiServiceStub>(MyApiServiceKey);
    myConfigService = module.get<MyConfigServiceStub>(MyConfigServiceKey);
    oAuthProviderRepository = module.get<OAuthProviderRepositoryStub>(OAuthProviderRepositoryKey);
    oAuthDataRepository = module.get<OAuthDataRepositoryStub>(OAuthDataRepositoryKey);
    userService = module.get<UserServiceStub>(UserServiceKey);
    userRoleService = module.get<UserRoleServiceStub>(UserRoleServiceKey);
    userSigupChannelService = module.get<UserSignupChannelServiceStub>(UserSignupChannelServiceKey);
    myJwtService = module.get<MyJwtServiceStub>(MyJwtServiceKey);

    oAuthDataRepository.reset();
  });

  describe('processOAuth', () => {
    it('이메일이 없는 경우 OAuthFailureException 예외를 던진다', () => {
      const dto: ProcessOAuthDto = { data: '', email: '', profile: '', provider: '' };

      expect(() => oAuthService.processOAuth(dto)).rejects.toThrow(OAuthFailureException);
    });

    it('소셜로그인 프로바이더가 없는경우 OAuthProviderNotFoundException 예외를 던진다', () => {
      const dto: ProcessOAuthDto = { data: '', email: faker.internet.email(), profile: '', provider: '' };

      expect(() => oAuthService.processOAuth(dto)).rejects.toThrow(OAuthProviderNotFoundException);
    });

    it.todo('추가 로직 검사');
  });
});
