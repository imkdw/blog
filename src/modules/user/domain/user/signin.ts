import { OmitType } from '@nestjs/swagger';
import { compare } from 'bcrypt';
import { InvalidCredentialException } from '../../../../common/exceptions/401';
import User from './user.domain';

export default class SigninUser extends OmitType(User, ['id']) {
  constructor(email: string, password: string | null) {
    super();
    this.email = email;
    this.password = password;
  }

  async comparePassword(password: string): Promise<void> {
    const isCompare = await compare(password, this.password);
    if (!isCompare) throw new InvalidCredentialException();
  }
}
