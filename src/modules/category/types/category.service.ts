import Category from '../domain/category.entity';
import { CreateCategoryDto } from './dto/internal/create-category.dto';
import { FindCategoriesDto, FindCategoriesResult } from './dto/internal/find-categories.dto';

export const CategoryServiceSymbol = Symbol('CategoryService');
export interface CategoryService {
  createCategory(dto: CreateCategoryDto, userId: string): Promise<Category>;

  findParentCategories(): Promise<FindCategoriesResult>;

  findChildCategories(parentParam: string): Promise<FindCategoriesResult>;

  findCategories(dto: FindCategoriesDto): Promise<FindCategoriesResult>;

  findById(categoryId: number): Promise<Category>;

  findByParentId(parentId: number): Promise<Category>;

  findByParam(param: string): Promise<Category | null>;
}
