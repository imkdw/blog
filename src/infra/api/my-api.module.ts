import { ClassProvider, Module } from '@nestjs/common';
import { MyApiServiceKey } from './interfaces/my-api.interface';
import MyApiService from './service/my-api.service';

const MyApiServiceProvider: ClassProvider = {
  provide: MyApiServiceKey,
  useClass: MyApiService,
};

@Module({
  providers: [MyApiServiceProvider],
  exports: [MyApiServiceKey],
})
export default class MyApiModule {}
