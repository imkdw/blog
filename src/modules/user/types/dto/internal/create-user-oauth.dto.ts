import { usersOAuth } from '@prisma/client';

export interface CreateUserOAuthDto extends Pick<usersOAuth, 'userId' | 'providerId'> {}
