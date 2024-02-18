import Category from '../domain/category.entity';
import { CreateCategoryDto } from './dto/internal/create-category.dto';
import { FindCategoriesResult } from './dto/internal/find-categories.dto';

export const CategoryServiceSymbol = Symbol('CategoryService');
export interface CategoryService {
  createCategory(dto: CreateCategoryDto, userId: string): Promise<Category>;

  findCategories(): Promise<FindCategoriesResult>;
}
