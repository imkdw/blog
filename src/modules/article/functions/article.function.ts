import { NODE_ENVIROMENT } from '../../../common/constants/env.constant';

/**
 * 게시글 작성시 본문에 작성된 이미지의 링크를 변경하는 함수
 *
 * 기존 링크 : https://presigned.imkdw.dev/{imageName}
 * 변경 링크 : https://static.imkdw.dev/{imageName} or https://local-static.imkdw.dev/{imageName}
 *
 * @param content - 게시글 본문
 */
export const replaceContentImageUrl = (articleId: string, content: string) => {
  const originalUrl = /https:\/\/presigned.imkdw.dev/g;
  const replacedUrl =
    process.env.NODE_ENV === NODE_ENVIROMENT.PRODUCTION
      ? `https://static.imkdw.dev/articles/${articleId}`
      : `https://local-static.imkdw.dev/articles/${articleId}`;

  return content.replace(originalUrl, replacedUrl);
};

/**
 * 게시글의 썸네일 이미지 URL을 생성하는 함수
 *
 * 운영환경에 따라서 도메인의 주소를 다르게 반환함
 *
 * @param images - 업로드된 이미지의 URL 목록
 */
export const generateThumbnail = (articleId: string, thumbnail: string): string => {
  const domain =
    process.env.NODE_ENV === NODE_ENVIROMENT.PRODUCTION ? 'https://static.imkdw.dev' : 'https://local-static.imkdw.dev';

  return `${domain}/articles/${articleId}/${thumbnail}`;
};
