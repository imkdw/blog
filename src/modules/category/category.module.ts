import { ClassProvider, Module } from '@nestjs/common';
import { CategoryServiceSymbol } from './types/category.service';
import CategoryServiceImpl from './service/category-impl.service';
import { CategoryRepositorySymbol } from './types/category.repository';
import CategoryMemoryRepository from './repository/category-memory.repository';
import CategoryController from './controller/category.controller';

const CategoryServiceProvider: ClassProvider = {
  provide: CategoryServiceSymbol,
  useClass: CategoryServiceImpl,
};

const CategoryRepositoryProvider: ClassProvider = {
  provide: CategoryRepositorySymbol,
  useClass: CategoryMemoryRepository,
};

@Module({
  controllers: [CategoryController],
  providers: [CategoryServiceProvider, CategoryRepositoryProvider],
})
export default class CategoryModule {}
