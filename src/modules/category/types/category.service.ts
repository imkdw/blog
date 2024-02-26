import Category from '../domain/category.entity';
import { CreateCategoryDto } from './dto/internal/create-category.dto';
import { FindCategoriesDto, FindCategoriesResult } from './dto/internal/find-categories.dto';

export const CategoryServiceSymbol = Symbol('CategoryService');
export interface CategoryService {
  createCategory(dto: CreateCategoryDto, userId: string): Promise<Category>;

  findCategories(dto: FindCategoriesDto): Promise<FindCategoriesResult>;

  findCategoryById(categoryId: number): Promise<Category>;

  findCategoryByParentId(parentId: number): Promise<Category>;
}
