import { IS3Bucket } from '../enums/s3.enum';

export const AwsS3ServiceKey = Symbol('AwsS3Service');
export interface IAwsS3Service {
  getPresignedUrl(fileName: string, extension: string): Promise<string>;
  copyFile(params: CopyFileParams): Promise<void>;
}

export interface CopyFileParams {
  from: IS3Bucket;
  to: IS3Bucket;
  originalFileNames: string[];
  fileNames: string[];
}
