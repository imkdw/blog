import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import * as Swagger from '../docs/category.swagger';
import { Public } from '../../auth/decorators/public.decorator';
import { ResponseCreateCategoryDto, ResponseGetCategoriesDto } from '../dto/response/category.dto';
import { RequestCreateCategoryDto, RequestUpdateCategoryDto } from '../dto/request/category.dto';
import Admin from '../../auth/decorators/admin.decorator';
import { toResponseCreateCategoryDto, toResponseGetCategoriesDto } from '../mapper/category.mapper';
import CategoryService from '../service/category.service';

@ApiTags('[카테고리]')
@Controller({ path: 'categories', version: '1' })
export default class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Swagger.getCategories('카테고리 목록 조회')
  @Public()
  @Get()
  async getCategories(): Promise<ResponseGetCategoriesDto> {
    const categories = await this.categoryService.getCategoriesWithChildren();
    return toResponseGetCategoriesDto(categories);
  }

  @Swagger.createCategory('카테고리 생성')
  @Admin()
  @Post()
  async createCategory(@Body() dto: RequestCreateCategoryDto): Promise<ResponseCreateCategoryDto> {
    const createdCatgory = await this.categoryService.createCategory(dto);
    return toResponseCreateCategoryDto(createdCatgory);
  }

  @Swagger.deleteCategory('카테고리 삭제')
  @Admin()
  @Delete(':categoryId')
  async deleteCategory(@Param('categoryId', ParseIntPipe) categoryId: number): Promise<void> {
    await this.categoryService.deleteCategory(categoryId);
    return null;
  }

  @Swagger.updateCategory('카테고리 수정')
  @Admin()
  @Patch(':categoryId')
  async updateCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() dto: RequestUpdateCategoryDto,
  ): Promise<void> {
    await this.categoryService.updateCategory(categoryId, dto);
    return null;
  }
}
