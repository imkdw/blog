import { ClassProvider, Module } from '@nestjs/common';
import { CookieServiceSymbol } from './types/cookie.service';
import CookieServiceImpl from './service/cookie-impl.service';
import MyConfigModule from '../infra/config/my-config.module';

const CookieServiceProvider: ClassProvider = {
  provide: CookieServiceSymbol,
  useClass: CookieServiceImpl,
};

@Module({
  imports: [MyConfigModule],
  providers: [CookieServiceProvider],
  exports: [CookieServiceProvider],
})
export default class CommonModule {}
