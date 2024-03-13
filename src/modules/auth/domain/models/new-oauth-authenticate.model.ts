import { PickType } from '@nestjs/swagger';
import OAuthData from '../entities/oauth-data.entity';
import { SYSTEM_USER_ID } from '../../../../common/constants/system.constant';

export default class NewOAuthAuthenticate extends PickType(OAuthData, [
  'email',
  'providerId',
  'data',
  'token',
  'createUser',
  'updateUser',
]) {
  constructor(email: string, providerId: number, data: string, token: string) {
    super();
    this.email = email;
    this.providerId = providerId;
    this.data = data;
    this.token = token;
    this.createUser = SYSTEM_USER_ID;
    this.updateUser = SYSTEM_USER_ID;
  }
}
