import { Controller, Get } from '@nestjs/common';
import { Public } from './common/decorators/public.decorator';

@Controller()
export default class AppController {
  @Public()
  @Get()
  getHello(): string {
    return 'hello';
  }
}
