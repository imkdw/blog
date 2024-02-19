import { ClassProvider, Module } from '@nestjs/common';
import { MyApiServiceSymbol } from './types/my-api.service';
import MyApiServiceImpl from './service/my-api-impl.service';

const MyApiServiceProvider: ClassProvider = {
  provide: MyApiServiceSymbol,
  useClass: MyApiServiceImpl,
};

@Module({
  providers: [MyApiServiceProvider],
  exports: [MyApiServiceSymbol],
})
export default class MyApiModule {}
