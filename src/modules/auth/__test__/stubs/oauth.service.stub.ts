/* eslint-disable @typescript-eslint/no-unused-vars */
import { faker } from '@faker-js/faker';
import { AuthResult } from '../../dto/internal/auth-result.dto';
import { OAuthDto, OAuthResult, ProcessOAuthDto } from '../../dto/internal/oauth.dto';
import { IOAuthService, ProcessOAuthResult } from '../../interfaces/oauth.interface';
import { OAuthProvider } from '../../enums/auth.enum';
import createUUID from '../../../../common/utils/uuid';
import { USER_DEFAULT_PROFILE } from '../../../user/constants/user.constant';
import { UserRole } from '../../../user/enums/user-role.enum';

export default class OAuthServiceStub implements IOAuthService {
  async googleOAuth(authorization: string): Promise<OAuthResult> {
    return {
      email: faker.internet.email(),
      isExist: false,
      provider: OAuthProvider.GOOGLE,
      token: createUUID(),
    };
  }

  async githubOAuth(code: string, redirectUri: string): Promise<OAuthResult> {
    return {
      email: faker.internet.email(),
      isExist: false,
      provider: OAuthProvider.GITHUB,
      token: createUUID(),
    };
  }

  async kakaoOAuth(code: string, redirectUri: string): Promise<OAuthResult> {
    return {
      email: faker.internet.email(),
      isExist: false,
      provider: OAuthProvider.KAKAO,
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
      role: UserRole.NORMAL,
    };
  }

  async oAuthSignUp(dto: OAuthDto): Promise<AuthResult> {
    return {
      accessToken: 'accessToken',
      refreshToken: 'refreshToken',
      email: faker.internet.email(),
      nickname: faker.person.firstName(),
      profile: USER_DEFAULT_PROFILE,
      role: UserRole.NORMAL,
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
