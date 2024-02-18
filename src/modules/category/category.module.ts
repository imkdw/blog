import { ClassProvider, Module } from '@nestjs/common';
import { CategoryServiceSymbol } from './types/category.service';
import CategoryServiceImpl from './service/category-impl.service';
import { CategoryRepositorySymbol } from './types/category.repository';
import CategoryController from './controller/category.controller';
import PrismaModule from '../../infra/database/prisma/prisma.module';
import CategoryPrismaRepository from './repository/category-prisma.repository';

const CategoryServiceProvider: ClassProvider = {
  provide: CategoryServiceSymbol,
  useClass: CategoryServiceImpl,
};

const CategoryRepositoryProvider: ClassProvider = {
  provide: CategoryRepositorySymbol,
  useClass: CategoryPrismaRepository,
};

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryServiceProvider, CategoryRepositoryProvider],
  exports: [CategoryServiceProvider],
})
export default class CategoryModule {}
