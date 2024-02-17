import { tag } from '@prisma/client';

export interface CreateTagDto extends Pick<tag, 'name'> {}
