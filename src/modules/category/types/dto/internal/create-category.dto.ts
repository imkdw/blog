import { category } from '@prisma/client';

export interface CreateCategoryDto extends Pick<category, 'parentId' | 'name' | 'param'> {}
