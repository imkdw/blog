import { Module } from '@nestjs/common';
import { MyConfigServiceKey } from './interfaces/my-config.interface';
import MyConfigService from './service/my-config.service';

const MyConfigSerivceProvider = {
  provide: MyConfigServiceKey,
  useClass: MyConfigService,
};

@Module({
  providers: [MyConfigSerivceProvider],
  exports: [MyConfigSerivceProvider],
})
export default class MyConfigModule {}
