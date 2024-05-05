import { FindOption } from '../../../common/interfaces/find-option.interface';
import { CreateCategoryDto, GetCategoriesWithChildrenResult, UpdateCategoryDto } from '../dto/internal/category.dto';
import Category from '../entities/category.entity';

export const CategoryServiceKey = Symbol('CategoryService');
export interface ICategoryService {
  getCategoriesWithChildren(): Promise<GetCategoriesWithChildrenResult[]>;
  createCategory(dto: CreateCategoryDto): Promise<Category>;
  deleteCategory(categoryId: number): Promise<void>;
  updateCategory(categoryId: number, dto: UpdateCategoryDto): Promise<void>;
  findByParam(param: string, option?: FindOption): Promise<Category | null>;
  findById(id: number, option?: FindOption): Promise<Category | null>;
  findByName(name: string, option?: FindOption): Promise<Category | null>;
}

export const CategoryRepositoryKey = Symbol('CategoryRepository');
export interface ICategoryRepository {
  findById(id: number, option?: FindOption): Promise<Category | null>;
  findByParentId(parentId: number, option?: FindOption): Promise<Category | null>;
  findByName(name: string, option?: FindOption): Promise<Category | null>;
  findByParam(param: string, option?: FindOption): Promise<Category | null>;

  findManyByParentId(parentId: number, option?: FindOption): Promise<Category[]>;
  findParentCategories(option?: FindOption): Promise<Category[]>;
  findAll(option?: FindOption): Promise<Category[]>;

  save(data: Category): Promise<Category>;
  delete(categoryId: number): Promise<void>;
  update(categoryId: number, data: UpdateCategoryDto): Promise<void>;
}
