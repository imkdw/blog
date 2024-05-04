/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from '@faker-js/faker';
import { AuthResult } from '../../dto/internal/auth-result.dto';
import { OAuthDto, OAuthResult, ProcessOAuthDto } from '../../dto/internal/oauth.dto';
import { IOAuthService, ProcessOAuthResult } from '../../interfaces/oauth.interface';
import createUUID from '../../../../common/utils/uuid';
import { USER_DEFAULT_PROFILE } from '../../../user/constants/user.constant';
import { OAuthProviders } from '../../enums/auth.enum';
import { UserRoles } from '../../../user/enums/user-role.enum';

export default class OAuthServiceStub implements IOAuthService {
  async googleOAuth(authorization: string): Promise<OAuthResult> {
    return {
      email: faker.internet.email(),
      isExist: false,
      provider: OAuthProviders.GOOGLE,
      token: createUUID(),
    };
  }

  async githubOAuth(code: string, redirectUri: string): Promise<OAuthResult> {
    return {
      email: faker.internet.email(),
      isExist: false,
      provider: OAuthProviders.GITHUB,
      token: createUUID(),
    };
  }

  async kakaoOAuth(code: string, redirectUri: string): Promise<OAuthResult> {
    return {
      email: faker.internet.email(),
      isExist: false,
      provider: OAuthProviders.KAKAO,
      token: createUUID(),
    };
  }

  async oAuthSignIn(dto: OAuthDto): Promise<AuthResult> {
    return {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      email: faker.internet.email(),
      nickname: faker.person.firstName(),
      profile: USER_DEFAULT_PROFILE,
      role: UserRoles.NORMAL,
    };
  }

  async oAuthSignUp(dto: OAuthDto): Promise<AuthResult> {
    return {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      email: faker.internet.email(),
      nickname: faker.person.firstName(),
      profile: USER_DEFAULT_PROFILE,
      role: UserRoles.NORMAL,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async onModuleInit(): Promise<void> {}

  async processOAuth(dto: ProcessOAuthDto): Promise<ProcessOAuthResult> {
    return {
      email: dto.email,
      isExist: false,
      provider: dto.provider,
      token: createUUID(),
    };
  }
}
