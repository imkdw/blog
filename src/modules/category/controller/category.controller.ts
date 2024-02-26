import { Body, Controller, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CategoryService, CategoryServiceSymbol } from '../types/category.service';
import * as Swagger from '../docs/category.swagger';
import RequestCreateCategory from '../types/dto/request/create-category.dto';
import AdminGuard from '../../auth/guards/admin.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRoles } from '../../user/domain/user.entity';
import User, { IUser } from '../../../common/decorators/user.decorator';
import { Public } from '../../../common/decorators/public.decorator';
import ResponseFindCategoriesDto from '../types/dto/response/find-categories.dto';
import RequestGetCategoryQuery from '../types/dto/request/get-category.dto';

@ApiTags('카테고리')
@Controller({ path: 'category', version: '1' })
export default class CategoryController {
  constructor(@Inject(CategoryServiceSymbol) private readonly categoryService: CategoryService) {}

  @UseGuards(AdminGuard)
  @Roles(UserRoles.ADMIN)
  @Swagger.createCategory('카테고리 생성')
  @Post()
  async createCategory(@Body() dto: RequestCreateCategory, @User() user: IUser): Promise<void> {
    await this.categoryService.createCategory(dto, user.userId);
  }

  @Swagger.findCategories('카테고리 목록 조회')
  @Public()
  @Get()
  async findCategories(@Query() query: RequestGetCategoryQuery): Promise<ResponseFindCategoriesDto> {
    const { filter, parentId } = query;
    const categories = await this.categoryService.findCategories({ filter, parentId });
    return categories;
  }
}
