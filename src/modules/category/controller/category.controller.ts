import { Controller, Get, Inject } from '@nestjs/common';
import {
  CategoryMapperKey,
  CategoryServiceKey,
  ICategoryMapper,
  ICategoryService,
} from '../interfaces/category.interface';
import * as Swagger from '../docs/category.swagger';
import { Public } from '../../../common/decorators/public.decorator';
import { ResponseGetCategoriesDto } from '../dto/response/category.dto';

@Controller({ path: 'categories', version: '1' })
export default class CategoryController {
  constructor(
    @Inject(CategoryServiceKey) private readonly categoryService: ICategoryService,
    @Inject(CategoryMapperKey) private readonly categoryMapper: ICategoryMapper,
  ) {}

  // 카테고리 조회
  @Swagger.getCategories('카테고리 목록 조회')
  @Public()
  @Get()
  async getCategories(): Promise<ResponseGetCategoriesDto> {
    const categories = await this.categoryService.getCategoriesWithChildren();
    return this.categoryMapper.toResponseGetCategoriesDto(categories);
  }

  // 카테고리 생성

  // 카테고리 수정
}
