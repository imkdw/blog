import { ClassProvider, Module } from '@nestjs/common';
import { CookieServiceSymbol } from './types/cookie.service';
import CookieServiceImpl from './service/cookie-impl.service';

const CookieServiceProvider: ClassProvider = {
  provide: CookieServiceSymbol,
  useClass: CookieServiceImpl,
};

@Module({
  providers: [CookieServiceProvider],
  exports: [CookieServiceSymbol],
})
export default class CommonModule {}
