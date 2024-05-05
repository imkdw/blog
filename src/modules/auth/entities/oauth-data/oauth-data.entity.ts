import BaseEntity from '../../../../common/domain/base.entity';

export default class OAuthData extends BaseEntity {
  constructor(data: OAuthData) {
    super();
    this.id = data.id;
    this.email = data.email;
    this.providerId = data.providerId;
    this.profile = data.profile;
    this.data = data.data;
    this.token = data.token;
  }

  id: number;
  email: string;
  providerId: number;
  profile: string | null;
  data: string;
  token: string;
}

export class OAuthDataBuilder {
  private _id: number;
  private _email: string;
  private _providerId: number;
  private _profile: string | null;
  private _data: string;
  private _token: string;

  id(id: number) {
    this._id = id;
    return this;
  }

  email(email: string) {
    this._email = email;
    return this;
  }

  providerId(providerId: number) {
    this._providerId = providerId;
    return this;
  }

  profile(profile: string | null) {
    this._profile = profile;
    return this;
  }

  data(data: string) {
    this._data = data;
    return this;
  }

  token(token: string) {
    this._token = token;
    return this;
  }

  build() {
    return new OAuthData({
      id: this._id,
      email: this._email,
      providerId: this._providerId,
      profile: this._profile,
      data: this._data,
      token: this._token,
    });
  }
}
