import { users } from '@prisma/client';

export interface UpdateUserDto extends Partial<Omit<users, 'id'>> {}
