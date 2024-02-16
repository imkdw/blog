import Category from '../domain/category.entity';
import { CreateCategoryDto } from './dto/internal/create-category.dto';

export const CategoryServiceSymbol = Symbol('CategoryService');
export interface CategoryService {
  createCategory(dto: CreateCategoryDto): Category;
}
