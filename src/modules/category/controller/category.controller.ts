import { Body, Controller, Inject, Post } from '@nestjs/common';
import { CategoryService, CategoryServiceSymbol } from '../types/category.service';
import * as Swagger from '../docs/category.swagger';
import RequestCreateCategory from '../types/dto/request/create-category.dto';

@Controller({ path: 'category', version: '1' })
export default class CategoryController {
  constructor(@Inject(CategoryServiceSymbol) private readonly categoryService: CategoryService) {}

  @Swagger.createCategory('카테고리 생성')
  @Post()
  createCategory(@Body() dto: RequestCreateCategory) {
    this.categoryService.createCategory(dto);
  }
}
