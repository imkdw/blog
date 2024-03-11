import { Injectable } from '@nestjs/common';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';

import { IEmailService, IEmailSubject } from '../interfaces/email.interface';

@Injectable()
export default class EmailService implements IEmailService {
  private sesClient: SESClient;

  private readonly SOURCE_EMAIL_ADDRESS = 'admin@imkdw.dev';

  async onModuleInit() {
    this.sesClient = new SESClient({
      credentials: {
        accessKeyId: process.env.AWS_IAM_ACCESS_KEY,
        secretAccessKey: process.env.AWS_IAM_SECRET_ACCESS_KEY,
      },
      region: process.env.AWS_REGION,
    });
  }

  async send(email: string, subject: IEmailSubject, html: string): Promise<void> {
    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Html: {
            Data: html,
          },
        },
      },
      Source: this.SOURCE_EMAIL_ADDRESS,
    });

    await this.sesClient.send(command);
  }
}
