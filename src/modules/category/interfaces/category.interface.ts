import { FindOption } from '../../../common/interfaces/find-option.interface';
import Category from '../domain/category.domain';
import { CreateCategoryDto, GetCategoriesWithChildrenResult, UpdateCategoryDto } from '../dto/internal/category.dto';
import CreateCategory from '../domain/create';
import UpdateCategory from '../domain/update';

export const CategoryServiceKey = Symbol('CategoryService');
export interface ICategoryService {
  getCategoriesWithChildren(): Promise<GetCategoriesWithChildrenResult[]>;

  createCategory(dto: CreateCategoryDto): Promise<Category>;

  deleteCategory(categoryId: number): Promise<void>;

  updateCategory(categoryId: number, dto: UpdateCategoryDto): Promise<void>;

  findOne(dto: Partial<Category>, option: FindOption): Promise<Category | null>;
}

export const CategoryRepositoryKey = Symbol('CategoryRepository');
export interface ICategoryRepository {
  findMany(dto: Partial<Category>, option: FindOption): Promise<Category[]>;
  findOne(dto: Partial<Category>, option: FindOption): Promise<Category | null>;
  save(data: CreateCategory): Promise<Category>;
  delete(categoryId: number): Promise<void>;
  update(categoryId: number, data: UpdateCategory): Promise<void>;
}
