import { OmitType } from '@nestjs/swagger';
import { compare } from 'bcrypt';
import { InvalidCredentialException } from '../../../../common/exceptions/401';
import UserEntity from '../../entities/user.entity';

export default class SigninUser extends OmitType(UserEntity, ['id']) {
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
