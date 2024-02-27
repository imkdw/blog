import { category } from '@prisma/client';

const categorySeed: Pick<category, 'id' | 'name' | 'parentId' | 'param' | 'sort' | 'createUser' | 'updateUser'>[] = [
  {
    id: 1,
    name: '백엔드',
    param: 'backend',
    parentId: null,
    sort: 1,

    createUser: '_system',
    updateUser: '_system',
  },
  {
    id: 2,
    name: '프론트엔드',
    param: 'frontend',
    parentId: null,
    sort: 2,
    createUser: '_system',
    updateUser: '_system',
  },
  {
    id: 3,
    name: 'Nest.js',
    param: 'nestjs',
    parentId: 1,
    sort: 1,
    createUser: '_system',
    updateUser: '_system',
  },
  {
    id: 4,
    name: '데이터베이스',
    param: 'database',
    parentId: null,
    sort: 3,
    createUser: '_system',
    updateUser: '_system',
  },
];

export default categorySeed;
