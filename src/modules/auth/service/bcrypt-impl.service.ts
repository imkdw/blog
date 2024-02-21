import { hash, compare } from 'bcrypt';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { BcryptService } from '../types/service/bcrypt.service';
import { MyConfigService, MyConfigServiceSymbol } from '../../../infra/config/types/my-config.service';
import { BcryptConfig } from '../../../infra/config/types/my-config.interface';

@Injectable()
export default class BcryptServiceImpl implements BcryptService, OnModuleInit {
  private bcryptConfig: BcryptConfig;

  constructor(@Inject(MyConfigServiceSymbol) private readonly myConfigService: MyConfigService) {}

  async onModuleInit() {
    this.bcryptConfig = this.myConfigService.getBcryptConfig();
  }

  async toHash(text: string): Promise<string> {
    const hashedText = await hash(text, this.bcryptConfig.salt);
    return hashedText;
  }

  async compare(text: string, hashedText: string): Promise<boolean> {
    const isMatch = await compare(text, hashedText);
    return isMatch;
  }
}
