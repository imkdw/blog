import { users } from '@prisma/client';

const userSeed: Pick<
  users,
  'email' | 'nickname' | 'password' | 'profile' | 'roleId' | 'signupChannelId' | 'createUser' | 'updateUser'
>[] = [
  {
    email: 'test@test.com',
    nickname: 'testacct',
    password: 'Test121212!@',
    profile: 'https://via.placeholder.com/50x50',
    roleId: 2,
    signupChannelId: 1,
    createUser: 'testacct',
    updateUser: 'testacct',
  },
];

export default userSeed;
