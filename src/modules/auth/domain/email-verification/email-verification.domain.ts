import BaseEntity from '../../../../common/domain/base.entity';

export default class EmailVerification extends BaseEntity {
  constructor(data: EmailVerification) {
    super();
    this.id = data.id;
    this.email = data.email;
    this.code = data.code;
    this.expiredAt = data.expiredAt;
    this.verifiedAt = data.verifiedAt;
  }

  /**
   * PK
   */
  id: number;

  /**
   * 인증메일을 발송한 이메일 주소
   */
  email: string;

  /**
   * 발급한 인증코드
   */
  code: string;

  /**
   * 이메일 인증 만료시간
   */
  expiredAt: Date;

  /**
   * 이메일 인증 시간
   */
  verifiedAt: Date | null;
}
