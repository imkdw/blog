import { PickType } from '@nestjs/swagger';
import OAuthDataEntity from './oauth-data.entity';

export default class OAuthDataCreateEntity extends PickType(OAuthDataEntity, [
  'email',
  'providerId',
  'profile',
  'data',
  'token',
]) {
  constructor(data: OAuthDataCreateEntity) {
    super();
    this.email = data.email;
    this.providerId = data.providerId;
    this.profile = data.profile;
    this.data = data.data;
  }
}

export class OAuthDataCreateEntityBuilder {
  private email: string;

  private providerId: number;

  private profile: string | null;

  private data: string;

  private token: string;

  setEmail(email: string): OAuthDataCreateEntityBuilder {
    this.email = email;
    return this;
  }

  setProviderId(providerId: number): OAuthDataCreateEntityBuilder {
    this.providerId = providerId;
    return this;
  }

  setProfile(profile: string | null): OAuthDataCreateEntityBuilder {
    this.profile = profile;
    return this;
  }

  setData(data: string): OAuthDataCreateEntityBuilder {
    this.data = data;
    return this;
  }

  setToken(token: string): OAuthDataCreateEntityBuilder {
    this.token = token;
    return this;
  }

  build(): OAuthDataCreateEntity {
    return new OAuthDataCreateEntity({
      email: this.email,
      providerId: this.providerId,
      profile: this.profile,
      data: this.data,
      token: this.token,
    });
  }
}
