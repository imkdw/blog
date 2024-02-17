import { users } from '@prisma/client';

export interface UpdateUserDto extends Partial<Pick<users, 'email' | 'nickname' | 'password'>> {}
