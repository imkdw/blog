/* eslint-disable @typescript-eslint/no-unused-vars */
import { CopyFileParams, IAwsS3Service } from '../../interfaces/s3.interface';

export default class AwsS3ServiceStub implements IAwsS3Service {
  callCopyFileCount = 0;

  async copyFile(params: CopyFileParams): Promise<void> {
    this.callCopyFileCount += 1;
  }

  async getPresignedUrl(fileName: string, extension: string): Promise<string> {
    return 'presignedurl';
  }

  reset() {
    this.callCopyFileCount = 0;
  }
}
