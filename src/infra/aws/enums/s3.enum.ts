export const S3Bucket = {
  /**
   * 정적파일이 저장되는 버킷
   * 개발환경에 따라 접두사가 달라진다.
   *
   * @example imkdw-dev-static-local
   * @example imkdw-dev-static-production
   */
  STATIC: `imkdw-dev-static-${process.env.NODE_ENV}`,

  /**
   * Presigned URL을 통해서 파일을 업로드하는 버킷
   * https://imkdw-presigned.s3.ap-northeast-2.amazonaws.com
   */
  PRESIGNED: 'imkdw-presigned',
} as const;
export type IS3Bucket = (typeof S3Bucket)[keyof typeof S3Bucket];

export const S3BucketDirectory = {
  ARTICLE_IMAGE: 'articles',
} as const;
export type IS3BucketDirectory = (typeof S3BucketDirectory)[keyof typeof S3BucketDirectory];
