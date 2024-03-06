import { Inject, Injectable } from '@nestjs/common';
import { ExOAuthProviderService } from '../types/service/ex-oauth-provider.service';
import {
  ExOAuthProviderRepository,
  ExOAuthProviderRepositorySymbol,
} from '../types/repository/ex-oauth-provider.repository';
import { FindOption } from '../../../common/types/interfaces/find-option.interface';
import ExternalOAuthProvider from '../domain/ex-oauth-provider.entity';

@Injectable()
export default class ExOAuthProviderServiceImpl implements ExOAuthProviderService {
  constructor(
    @Inject(ExOAuthProviderRepositorySymbol) private readonly exOAuthProviderRepository: ExOAuthProviderRepository,
  ) {}

  async findByName(name: string, option: FindOption): Promise<ExternalOAuthProvider | null> {
    const provider = await this.exOAuthProviderRepository.findByName(name, option);
    return provider;
  }
}
