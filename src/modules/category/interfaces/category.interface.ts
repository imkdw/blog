import { FindOption } from '../../../common/interfaces/find-option.interface';
import { CreateCategoryDto, GetCategoriesWithChildrenResult, UpdateCategoryDto } from '../dto/internal/category.dto';
import CategoryCreateEntity from '../entities/category-create.entity';
import CategoryEntity from '../entities/category.entity';

export const CategoryServiceKey = Symbol('CategoryService');
export interface ICategoryService {
  getCategoriesWithChildren(): Promise<GetCategoriesWithChildrenResult[]>;
  createCategory(dto: CreateCategoryDto): Promise<CategoryEntity>;
  deleteCategory(categoryId: number): Promise<void>;
  updateCategory(categoryId: number, dto: UpdateCategoryDto): Promise<void>;
  findByParam(param: string, option?: FindOption): Promise<CategoryEntity | null>;
  findById(id: number, option?: FindOption): Promise<CategoryEntity | null>;
  findByName(name: string, option?: FindOption): Promise<CategoryEntity | null>;
}

export const CategoryRepositoryKey = Symbol('CategoryRepository');
export interface ICategoryRepository {
  findById(id: number, option?: FindOption): Promise<CategoryEntity | null>;
  findByParentId(parentId: number, option?: FindOption): Promise<CategoryEntity | null>;
  findByName(name: string, option?: FindOption): Promise<CategoryEntity | null>;
  findByParam(param: string, option?: FindOption): Promise<CategoryEntity | null>;

  findManyByParentId(parentId: number, option?: FindOption): Promise<CategoryEntity[]>;
  findParentCategories(option?: FindOption): Promise<CategoryEntity[]>;
  findAll(option?: FindOption): Promise<CategoryEntity[]>;

  save(data: CategoryCreateEntity): Promise<CategoryEntity>;
  delete(categoryId: number): Promise<void>;
  update(categoryId: number, data: UpdateCategoryDto): Promise<void>;
}
