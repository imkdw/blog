import { ClassProvider, Module } from '@nestjs/common';
import { CategoryMapperKey, CategoryRepositoryKey, CategoryServiceKey } from './interfaces/category.interface';
import CategoryService from './service/category.service';
import CategoryRepository from './repository/category.repository';
import CategoryController from './controller/category.controller';
import PrismaModule from '../../infra/database/prisma/prisma.module';
import CategoryMapper from './mapper/category.mapper';

const CategoryServiceProvider: ClassProvider = {
  provide: CategoryServiceKey,
  useClass: CategoryService,
};

const CategoryRepositoryProvider: ClassProvider = {
  provide: CategoryRepositoryKey,
  useClass: CategoryRepository,
};

const CategoryMapperProvider: ClassProvider = {
  provide: CategoryMapperKey,
  useClass: CategoryMapper,
};

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryServiceProvider, CategoryRepositoryProvider, CategoryMapperProvider],
})
export default class CategoryModule {}
