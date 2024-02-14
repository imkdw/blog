import { Module } from '@nestjs/common';
import MyConfigServiceImpl from './service/my-config-impl.service';
import { MyConfigServiceSymbol } from './types/my-config.service';

const MyConfigSerivceProvider = {
  provide: MyConfigServiceSymbol,
  useClass: MyConfigServiceImpl,
};

@Module({
  providers: [MyConfigSerivceProvider],
  exports: [MyConfigSerivceProvider],
})
export default class MyConfigModule {}
