import { ClassProvider, Module } from '@nestjs/common';
import { AwsS3ServiceKey } from './interfaces/s3.interface';
import AwsS3Service from './service/s3.service';
import AwsS3Controller from './controller/s3.controller';

const AwsS3ServiceProvider: ClassProvider = {
  provide: AwsS3ServiceKey,
  useClass: AwsS3Service,
};

@Module({
  controllers: [AwsS3Controller],
  providers: [AwsS3ServiceProvider],
  exports: [AwsS3ServiceProvider],
})
export default class AwsModule {}
