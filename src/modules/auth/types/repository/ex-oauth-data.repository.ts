import { Prisma } from '@prisma/client';
import ExternalOAuthData from '../../domain/ex-oauth-data.entity';
import { FindOption } from '../../../../common/types/interfaces/find-option.interface';

export const ExOAuthDataRepositorySymbol = Symbol('ExOAuthDataRepository');

export interface ExOAuthDataRepository {
  save(data: ExternalOAuthData): Promise<ExternalOAuthData>;

  update(id: number, data: Prisma.externalOAuthDataUpdateInput): Promise<void>;

  findByEmail(email: string, option: FindOption): Promise<ExternalOAuthData | null>;

  findByToken(token: string): Promise<ExternalOAuthData | null>;
}
