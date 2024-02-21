export interface GoogleOAuthUserInfoResponse {
  // 구글에서 발급한 고유 아이디
  id: string;

  // 구글 이메일
  email: string;

  // 구글 이메일 인증여부
  verified_email: boolean;

  // 구글에 등록된 이름
  name: string;

  // 이름(lastName)
  given_name: string;

  // 성(firstName)
  family_name: string;

  // 구글에 등록된 프로필사진
  picture: string;

  // 구글에 등록된 국가
  locale: string;

  // 구글에 등록된 소속정보(ex. 회사, 학교 등)
  hd: string;
}
