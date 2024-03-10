import { ClassProvider, Module } from '@nestjs/common';
import { EmailServiceKey } from './interfaces/email.interface';
import EmailService from './service/email.service';

const EmailServiceProvider: ClassProvider = {
  provide: EmailServiceKey,
  useClass: EmailService,
};

@Module({
  providers: [EmailServiceProvider],
  exports: [EmailServiceProvider],
})
export default class EmailModule {}
