import { ClassProvider, Module } from '@nestjs/common';
import { CategoryRepositoryKey, CategoryServiceKey } from './interfaces/category.interface';
import CategoryService from './service/category.service';
import CategoryRepository from './repository/category.repository';
import CategoryController from './controller/category.controller';
import PrismaModule from '../../infra/database/prisma/prisma.module';

const CategoryServiceProvider: ClassProvider = {
  provide: CategoryServiceKey,
  useClass: CategoryService,
};

const CategoryRepositoryProvider: ClassProvider = {
  provide: CategoryRepositoryKey,
  useClass: CategoryRepository,
};

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryServiceProvider, CategoryRepositoryProvider],
  exports: [CategoryServiceKey],
})
export default class CategoryModule {}
