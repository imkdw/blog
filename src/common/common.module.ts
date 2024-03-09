import { ClassProvider, Module } from '@nestjs/common';
import MyConfigModule from '../infra/config/my-config.module';
import { CookieServiceKey } from './interfaces/cookie.interface';
import CookieService from './service/cookie.service';

const CookieServiceProvider: ClassProvider = {
  provide: CookieServiceKey,
  useClass: CookieService,
};

@Module({
  imports: [MyConfigModule],
  providers: [CookieServiceProvider],
  exports: [CookieServiceProvider],
})
export default class CommonModule {}
