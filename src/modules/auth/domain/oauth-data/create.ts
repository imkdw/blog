import { PickType } from '@nestjs/swagger';
import OAuthData from './oauth-data.domain';
import { generateUUID } from '../../../../utils/uuid.util';

export default class CreateOAuthData extends PickType(OAuthData, ['email', 'providerId', 'data', 'token']) {
  constructor(data: Pick<CreateOAuthData, 'email' | 'providerId' | 'data'>) {
    super();
    this.email = data.email;
    this.providerId = data.providerId;
    this.data = data.data;
  }

  /**
   * OAuth 인증시 발급되는 토큰으로 인증이후 로그인 또는 회원가입에 사용한다.
   *
   * UUID 형식을 따른다
   */
  generateToken(): CreateOAuthData {
    this.token = generateUUID();
    return this;
  }
}
