import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MyConfigService, MyConfigServiceSymbol } from '../../../infra/config/types/my-config.service';
import { JwtConfig } from '../../../infra/config/types/my-config.interface';
import { MyJwtService } from '../types/my-jwt.service';
import { CreateJwtTokenDto } from '../types/dto/internal/create-token.dto';

@Injectable()
export default class MyJwtServiceImpl implements OnModuleInit, MyJwtService {
  private jwtConfig: JwtConfig;

  constructor(
    private readonly jwtService: JwtService,
    @Inject(MyConfigServiceSymbol) private readonly myConfigService: MyConfigService,
  ) {}

  onModuleInit() {
    this.jwtConfig = this.myConfigService.getJwtConfig();
  }

  createToken(dto: CreateJwtTokenDto): string {
    const { accessTokenExpiresIn, refreshTokenExpiresIn, secret } = this.jwtConfig;

    const expiresIn = dto.tokenType === 'access' ? accessTokenExpiresIn : refreshTokenExpiresIn;
    const payload = { userId: dto.email };

    const token = this.jwtService.sign(payload, { expiresIn, secret });
    return token;
  }
}
