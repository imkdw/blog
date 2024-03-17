import { category } from '@prisma/client';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import Category from '../domain/entities/category.entity';
import { ResponseCreateCategoryDto, ResponseGetCategoriesDto } from '../dto/response/category.dto';
import { CreateCategoryDto, GetCategoriesWithChildrenResult } from '../dto/internal/category.dto';
import CreatingCategory from '../domain/model/creating-category.model';

export const CategoryServiceKey = Symbol('CategoryService');
export interface ICategoryService {
  getCategoriesWithChildren(): Promise<GetCategoriesWithChildrenResult[]>;

  createCategory(dto: CreateCategoryDto): Promise<Category>;

  deleteCategory(categoryId: number): Promise<void>;
}

export const CategoryRepositoryKey = Symbol('CategoryRepository');
export interface ICategoryRepository {
  findMany(dto: Partial<Category>, option: FindOption): Promise<Category[]>;
  findOne(dto: Partial<Category>, option: FindOption): Promise<Category | null>;
  save(data: CreatingCategory): Promise<Category>;
  delete(categoryId: number): Promise<void>;
}

export const CategoryMapperKey = Symbol('CategoryMapper');
export interface ICategoryMapper {
  toCategory(_category: category): Category;

  toResponseGetCategoriesDto(result: GetCategoriesWithChildrenResult[]): ResponseGetCategoriesDto;

  toResponseCreateCategoryDto(_category: Category): ResponseCreateCategoryDto;
}
