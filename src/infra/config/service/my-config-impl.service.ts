import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm';

import { MyConfigService } from '../types/my-config.service';
import { IMyConfig } from '../types/enum/my-config.enum';

@Injectable()
export default class MyConfigServiceImpl implements MyConfigService, OnModuleInit {
  private ssmClient: SSMClient;

  onModuleInit() {
    this.ssmClient = new SSMClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_IAM_ACCESS_KEY,
        secretAccessKey: process.env.AWS_IAM_SECRET_ACCESS_KEY,
      },
    });
  }

  async getConfig<T>(name: IMyConfig): Promise<T> {
    const value = await this.getValue<T>(name);
    return value;
  }

  private async getValue<T>(name: string): Promise<T> {
    const command = new GetParameterCommand({
      Name: `/imkdw_dev/${name}`,
      WithDecryption: true,
    });

    try {
      const response = await this.ssmClient.send(command);
      const parsedValue = JSON.parse(response.Parameter.Value);
      const value = parsedValue[process.env.NODE_ENV];
      return value;
    } catch (err) {
      throw new InternalServerErrorException(`${name} 환경변수 로딩 실패`, err);
    }
  }
}
