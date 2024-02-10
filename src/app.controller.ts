import { Controller, Get } from '@nestjs/common';

@Controller()
export default class AppController {
  @Get()
  getHello(): string {
    return 'hello';
  }
}
