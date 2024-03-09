import { Injectable } from '@nestjs/common';
import { users } from '@prisma/client';

import { IUserMapper } from '../interfaces/user.interface';
import User from '../domain/entities/user.entity';

@Injectable()
export default class UserMapper implements IUserMapper {
  toUser(_users: users): User {
    return new User(_users);
  }
}
