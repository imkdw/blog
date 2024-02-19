import { Prisma } from '@prisma/client';
import ExternalOAuthData from '../../domain/ex-oauth-data.entity';

export const ExOAuthDataRepositorySymbol = Symbol('ExOAuthDataRepository');

export interface ExOAuthDataRepository {
  save(data: ExternalOAuthData): Promise<ExternalOAuthData>;

  update(id: number, data: Prisma.externalOAuthDataUpdateInput): Promise<void>;

  findByEmailAndProvider(email: string, providerId: number): Promise<ExternalOAuthData | null>;
}
