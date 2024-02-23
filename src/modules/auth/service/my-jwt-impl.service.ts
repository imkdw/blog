import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MyConfigService, MyConfigServiceSymbol } from '../../../infra/config/types/my-config.service';
import { JwtConfig } from '../../../infra/config/types/my-config.interface';
import { MyJwtService } from '../types/service/my-jwt.service';
import { CreateJwtTokenDto } from '../types/dto/internal/create-token.dto';
import { TokenPayload } from '../types/interfaces/internal/jwt-token.interface';
import { MyConfig } from '../../../infra/config/types/enum/my-config.enum';

@Injectable()
export default class MyJwtServiceImpl implements OnModuleInit, MyJwtService {
  private jwtConfig: JwtConfig;

  constructor(
    private readonly jwtService: JwtService,
    @Inject(MyConfigServiceSymbol) private readonly myConfigService: MyConfigService,
  ) {}

  async onModuleInit() {
    this.jwtConfig = await this.myConfigService.getConfig<JwtConfig>(MyConfig.JWT);
  }

  createToken(dto: CreateJwtTokenDto): string {
    const { accessTokenExpiresIn, refreshTokenExpiresIn, secret } = this.jwtConfig;

    const expiresIn = dto.tokenType === 'access' ? accessTokenExpiresIn : refreshTokenExpiresIn;
    const payload: TokenPayload = { userId: dto.userId, role: dto.role };

    const token = this.jwtService.sign(payload, { expiresIn, secret });
    return token;
  }

  verify(token: string): TokenPayload {
    return this.jwtService.verify(token, { secret: this.jwtConfig.secret });
  }
}
