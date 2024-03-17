import { Controller, Get } from '@nestjs/common';
import { Public } from './modules/auth/decorators/public.decorator';

@Controller()
export default class AppController {
  @Public()
  @Get()
  getHello(): string {
    return 'hello';
  }
}
