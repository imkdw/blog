import { FindOption } from '../../../../common/interfaces/find-option.interface';
import OAuthData from '../../entities/oauth-data/oauth-data.entity';
import { IOAuthDataRepository } from '../../interfaces/oauth.interface';

export default class OAuthDataRepositoryStub implements IOAuthDataRepository {
  private memory: OAuthData[] = [];

  isCallUpdate = false;

  async findByIdAndEmail({ id, email }: { id: number; email: string }, option?: FindOption): Promise<OAuthData> {
    const row = this.memory.find((data) => data.id === id && data.email === email);

    if (!row) return null;
    if (option?.includeDeleted && row.deleteAt) return null;

    return row;
  }

  async findByToken(token: string, option?: FindOption): Promise<OAuthData> {
    const row = this.memory.find((data) => data.token === token);

    if (!row) return null;
    if (option?.includeDeleted && row.deleteAt) return null;

    return row;
  }

  async save(data: OAuthData): Promise<OAuthData> {
    const id = this.memory.length + 1;
    const entity = new OAuthData({ ...data, id });
    this.memory.push(entity);

    return entity;
  }

  async update(id: number, data: Partial<OAuthData>): Promise<void> {
    const index = this.memory.findIndex((item) => item.id === id);
    if (index === -1) return;

    this.memory[index] = { ...this.memory[index], ...data } as OAuthData;
    this.isCallUpdate = true;
  }

  reset() {
    this.memory = [];
    this.isCallUpdate = false;
  }
}
