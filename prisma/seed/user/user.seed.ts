import { users } from '@prisma/client';

const userSeed: Pick<
  users,
  'email' | 'nickname' | 'password' | 'profile' | 'roleId' | 'signupChannelId' | 'createUser' | 'updateUser'
>[] = [
  {
    email: 'imkdw@kakao.com',
    nickname: 'testacct',
    // 원문 : Test121212!@
    password: '$2b$10$xtu0.slmtyStQReVtUyDNuClIl3JKzQ3PP/OT1KgAMBN3guwRoPZi',
    profile: 'https://via.placeholder.com/50x50',
    roleId: 2,
    signupChannelId: 1,
    createUser: 'testacct',
    updateUser: 'testacct',
  },
];

export default userSeed;
