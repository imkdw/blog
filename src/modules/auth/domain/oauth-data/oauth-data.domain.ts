import BaseEntity from '../../../../common/domain/base.entity';

export default class OAuthData extends BaseEntity {
  constructor(data: OAuthData) {
    super();

    this.id = data.id;
    this.email = data.email;
    this.providerId = data.providerId;
    this.profile = data.profile;
    this.data = data.data;
  }

  /**
   * PK
   */
  id: number;

  /**
   * OAuth 인증시 사용된 이메일
   */
  email: string;

  /**
   * OAuth 인증 제공사 아이디
   */
  providerId: number;

  /**
   * OAuth 인증 제공사로 부터 전달받은 프로필사진 URL
   */
  profile: string | null;

  /**
   * OAuth 인증 제공사로 부터 전달받은 OAuth 데이터를 문자열화한 값
   */
  data: string;

  /**
   * OAuth 인증시 발급되는 UUID 토큰
   */
  token: string;
}
