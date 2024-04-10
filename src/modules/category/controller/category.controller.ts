import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoryServiceKey, ICategoryService } from '../interfaces/category.interface';
import * as Swagger from '../docs/category.swagger';
import { Public } from '../../auth/decorators/public.decorator';
import { ResponseCreateCategoryDto, ResponseGetCategoriesDto } from '../dto/response/category.dto';
import { RequestCreateCategoryDto, RequestUpdateCategoryDto } from '../dto/request/category.dto';
import Admin from '../../auth/decorators/admin.decorator';
import { toResponseCreateCategoryDto, toResponseGetCategoriesDto } from '../mapper/category.mapper';

@ApiTags('[카테고리]')
@Controller({ path: 'categories', version: '1' })
export default class CategoryController {
  constructor(@Inject(CategoryServiceKey) private readonly categoryService: ICategoryService) {}

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
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':categoryId')
  async deleteCategory(@Param('categoryId', ParseIntPipe) categoryId: number): Promise<void> {
    await this.categoryService.deleteCategory(categoryId);
  }

  @Swagger.updateCategory('카테고리 수정')
  @Admin()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':categoryId')
  async updateCategory(
    @Param('categoryId', ParseIntPipe) categoryId: number,
    @Body() dto: RequestUpdateCategoryDto,
  ): Promise<void> {
    await this.categoryService.updateCategory(categoryId, dto);
  }
}
