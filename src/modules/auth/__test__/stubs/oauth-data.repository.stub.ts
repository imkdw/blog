import { FindOption } from '../../../../common/interfaces/find-option.interface';
import OAuthDataCreateEntity from '../../entities/oauth-data/oauth-data-create.entity';
import OAuthDataEntity from '../../entities/oauth-data/oauth-data.entity';
import { IOAuthDataRepository } from '../../interfaces/oauth.interface';

export default class OAuthDataRepositoryStub implements IOAuthDataRepository {
  private memory: OAuthDataEntity[] = [];

  isCallUpdate = false;

  async findByIdAndEmail({ id, email }: { id: number; email: string }, option?: FindOption): Promise<OAuthDataEntity> {
    const row = this.memory.find((data) => data.id === id && data.email === email);

    if (!row) return null;
    if (option?.includeDeleted && row.deleteAt) return null;

    return row;
  }

  async findByToken(token: string, option?: FindOption): Promise<OAuthDataEntity> {
    const row = this.memory.find((data) => data.token === token);

    if (!row) return null;
    if (option?.includeDeleted && row.deleteAt) return null;

    return row;
  }

  async save(data: OAuthDataCreateEntity): Promise<OAuthDataEntity> {
    const id = this.memory.length + 1;
    const entity = new OAuthDataEntity({ ...data, id });
    this.memory.push(entity);

    return entity;
  }

  async update(id: number, data: Partial<OAuthDataEntity>): Promise<void> {
    const index = this.memory.findIndex((item) => item.id === id);
    if (index === -1) return;

    this.memory[index] = { ...this.memory[index], ...data } as OAuthDataEntity;
    this.isCallUpdate = true;
  }

  reset() {
    this.memory = [];
    this.isCallUpdate = false;
  }
}
