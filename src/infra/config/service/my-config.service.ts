import { Injectable, InternalServerErrorException, OnModuleInit } from '@nestjs/common';
import { GetParameterCommand, SSMClient } from '@aws-sdk/client-ssm';

import { IMyConfig } from '../enums/my-config.enum';
import { IMyConfigService } from '../interfaces/my-config.interface';

@Injectable()
export default class MyConfigService implements IMyConfigService, OnModuleInit {
  private ssmClient: SSMClient;

  // Parameter Store에 등록하는 환경변수의 prefix
  private readonly CONFIG_PREFIX = 'imkdw_dev';

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
      Name: `/${this.CONFIG_PREFIX}/${name}`,
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
