import { ClassProvider, Module } from '@nestjs/common';
import { MyApiServiceSymbol } from './interfaces/my-api.interface';
import MyApiServiceImpl from './service/my-api.service';

const MyApiServiceProvider: ClassProvider = {
  provide: MyApiServiceSymbol,
  useClass: MyApiServiceImpl,
};

@Module({
  providers: [MyApiServiceProvider],
  exports: [MyApiServiceSymbol],
})
export default class MyApiModule {}
