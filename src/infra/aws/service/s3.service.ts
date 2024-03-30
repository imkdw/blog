import { Injectable, OnModuleInit } from '@nestjs/common';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { CopyObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

import { CopyFileParams, IAwsS3Service } from '../interfaces/s3.interface';
import { S3Bucket } from '../enums/s3.enum';
import { AwsS3CopyFileFailureException } from '../../../common/exceptions/500';

@Injectable()
export default class AwsS3Service implements IAwsS3Service, OnModuleInit {
  private s3Client: S3Client;

  onModuleInit() {
    this.s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_IAM_ACCESS_KEY,
        secretAccessKey: process.env.AWS_IAM_SECRET_ACCESS_KEY,
      },
    });
  }

  async getPresignedUrl(fileName: string, extension: string): Promise<string> {
    /** PresignedUrl의 만료 기한은 1시간으로 지정 */
    const PRESIGNED_URL_EXPIRATION = 3600;

    const command = new PutObjectCommand({
      Bucket: S3Bucket.PRESIGNED,
      Key: `${fileName}.${extension}`,
    });
    const presignedUrl = await getSignedUrl(this.s3Client, command, { expiresIn: PRESIGNED_URL_EXPIRATION });

    return presignedUrl;
  }

  async copyFile(params: CopyFileParams): Promise<void> {
    const { from, to, fileNames, originalFileNames } = params;

    const commands = fileNames.map(
      (fileName, index) =>
        new CopyObjectCommand({
          CopySource: `${from}/${originalFileNames[index]}`,
          Bucket: to,
          Key: fileName,
        }),
    );

    try {
      await Promise.all(commands.map((command) => this.s3Client.send(command)));
    } catch (error) {
      // TODO: Logger 추가하기
      // eslint-disable-next-line no-console
      console.error(error);
      throw new AwsS3CopyFileFailureException();
    }
  }
}
