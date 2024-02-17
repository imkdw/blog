import { Body, Controller, Get, Inject, Post, UseGuards } from '@nestjs/common';
import { CategoryService, CategoryServiceSymbol } from '../types/category.service';
import * as Swagger from '../docs/category.swagger';
import RequestCreateCategory from '../types/dto/request/create-category.dto';
import AdminGuard from '../../auth/guards/admin.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRoles } from '../../user/domain/user.entity';

@Controller({ path: 'category', version: '1' })
export default class CategoryController {
  constructor(@Inject(CategoryServiceSymbol) private readonly categoryService: CategoryService) {}

  @UseGuards(AdminGuard)
  @Roles(UserRoles.ADMIN)
  @Swagger.createCategory('카테고리 생성')
  @Post()
  async createCategory(@Body() dto: RequestCreateCategory): Promise<void> {
    await this.categoryService.createCategory(dto);
  }

  // 카테고리 목록 조회
  @Swagger.findCategories('카테고리 목록 조회')
  @Get()
  async findCategories() {
    const categories = await this.categoryService.findCategories();
    return categories;
  }
}
