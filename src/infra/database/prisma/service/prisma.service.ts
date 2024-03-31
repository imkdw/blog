import { Inject, Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';
import {
  ILocalStorageService,
  LocalStorageServiceKey,
} from '../../../local-storage/interfaces/local-storage.interface';

@Injectable()
export default class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(@Inject(LocalStorageServiceKey) private readonly localStorageService: ILocalStorageService) {
    // TODO: $use 메소드 deprecated 되었으므로 대체 방법 찾아보기
    super();

    this.$use(async (params, next) => {
      const userId = this.localStorageService.getUserId();
      const { action } = params;

      if (userId) {
        const newParams = { ...params };
        if (action === 'create') {
          newParams.args.data.createUser = userId;
          newParams.args.data.updateUser = userId;
          return next(newParams);
        }

        if (action === 'createMany') {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const updatedData = newParams.args.data.map((data: any) => ({
            ...data,
            createUser: userId,
            updateUser: userId,
          }));
          newParams.args.data = updatedData;

          return next(newParams);
        }

        if (action === 'update') {
          newParams.args.data.updateUser = userId;
          return next(newParams);
        }

        if (action === 'delete' || action === 'deleteMany') {
          newParams.action = 'updateMany';
          Object.assign(newParams.args, { data: { deleteAt: new Date(), deleteUser: userId } });
          return next(newParams);
        }
      }
      return next(params);
    });
  }

  async onModuleInit() {
    this.$connect();
  }
}
