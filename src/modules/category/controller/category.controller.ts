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
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CategoryMapperKey,
  CategoryServiceKey,
  ICategoryMapper,
  ICategoryService,
} from '../interfaces/category.interface';
import * as Swagger from '../docs/category.swagger';
import { Public } from '../../auth/decorators/public.decorator';
import { ResponseCreateCategoryDto, ResponseGetCategoriesDto } from '../dto/response/category.dto';
import { RequestCreateCategoryDto } from '../dto/request/category.dto';
import AdminGuard from '../../auth/guards/admin.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRoles } from '../../user/domain/entities/user-role.entity';

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
  @Swagger.createCategory('카테고리 생성')
  @UseGuards(AdminGuard)
  @Roles(UserRoles.ADMIN)
  @Post()
  async createCategory(@Body() dto: RequestCreateCategoryDto): Promise<ResponseCreateCategoryDto> {
    const createdCatgory = await this.categoryService.createCategory(dto);
    return this.categoryMapper.toResponseCreateCategoryDto(createdCatgory);
  }

  // 카테고리 삭제
  @Swagger.deleteCategory('카테고리 삭제')
  @UseGuards(AdminGuard)
  @Roles(UserRoles.ADMIN)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':categoryId')
  async deleteCategory(@Param('categoryId', ParseIntPipe) categoryId: number): Promise<void> {
    await this.categoryService.deleteCategory(categoryId);
  }
}
