import { Injectable } from '@nestjs/common';
import { userSignupChannel, users } from '@prisma/client';

import { IUserMapper } from '../interfaces/user.interface';
import User from '../domain/entities/user.entity';
import UserSignupChannel from '../domain/entities/user-signup-channel.entity';

@Injectable()
export default class UserMapper implements IUserMapper {
  toUser(_users: users): User {
    return new User(_users);
  }

  toUserSignupChannel(_signupChannel: userSignupChannel): UserSignupChannel {
    return new UserSignupChannel(_signupChannel);
  }
}
