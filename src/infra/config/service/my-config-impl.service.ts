import { Injectable } from '@nestjs/common';
import { MyConfigService } from '../types/my-config.service';
import { JwtConfig } from '../types/my-config.interface';

@Injectable()
export default class MyConfigServiceImpl implements MyConfigService {
  getJwtConfig(): JwtConfig {
    return {
      // TODO: 임시 컨피그 제거
      secret: '1234',
      accessTokenExpiresIn: '1d',
      refreshTokenExpiresIn: '30d',
    };
  }
}
