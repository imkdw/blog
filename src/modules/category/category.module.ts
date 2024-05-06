import { Module } from '@nestjs/common';
import CategoryService from './service/category.service';
import CategoryRepository from './repository/category.repository';
import CategoryController from './controller/category.controller';
import PrismaModule from '../../infra/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategoryController],
  providers: [CategoryService, CategoryRepository],
  exports: [CategoryService],
})
export default class CategoryModule {}
