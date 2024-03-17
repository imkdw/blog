import { ClassProvider, Module } from '@nestjs/common';
import { LocalStorageServiceKey } from './interfaces/local-storage.interface';
import LocalStorageService from './service/local-storage.service';

const LocalStorageServiceProvider: ClassProvider = {
  provide: LocalStorageServiceKey,
  useClass: LocalStorageService,
};

@Module({
  providers: [LocalStorageServiceProvider],
  exports: [LocalStorageServiceProvider],
})
export default class LocalStorageModule {}
