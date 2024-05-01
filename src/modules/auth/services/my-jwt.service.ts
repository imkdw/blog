import { Inject, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IMyConfigService, JwtConfig, MyConfigServiceKey } from '../../../infra/config/interfaces/my-config.interface';
import { IJwtToken, IMyJwtService } from '../interfaces/my-jwt.interface';
import { MyConfig } from '../../../infra/config/enums/my-config.enum';

@Injectable()
export default class MyJwtService implements OnModuleInit, IMyJwtService {
  private jwtConfig: JwtConfig;

  constructor(
    private readonly jwtService: JwtService,
    @Inject(MyConfigServiceKey) private readonly myConfigService: IMyConfigService,
  ) {}

  async onModuleInit() {
    this.jwtConfig = await this.myConfigService.getConfig<JwtConfig>(MyConfig.JWT);
  }

  createToken(tokenType: 'access' | 'refresh', userId: string): string {
    const { accessTokenExpiresIn, refreshTokenExpiresIn, secret } = this.jwtConfig;

    const expiresIn = tokenType === 'access' ? accessTokenExpiresIn : refreshTokenExpiresIn;
    const payload: IJwtToken = { userId };

    const token = this.jwtService.sign(payload, { expiresIn, secret });
    return token;
  }

  verify(token: string): IJwtToken {
    try {
      return this.jwtService.verify<IJwtToken>(token, { secret: this.jwtConfig.secret });
    } catch {
      throw new UnauthorizedException();
    }
  }
}
