import Category from '../domain/category.entity';

export const CategoryRepositorySymbol = Symbol('CategoryRepository');
export interface CategoryRepository {
  saveCategory(category: Category): Promise<Category>;

  findParentCategories(): Promise<Category[] | []>;

  findChildCategories(parentId: number): Promise<Category[] | []>;

  findCategoryById(id: number): Promise<Category | null>;

  findCategoryByName(name: string): Promise<Category | null>;

  findCategoryByParentId(parentId: number): Promise<Category | null>;

  findCategoriesByParentId(parentId: number): Promise<Category[] | []>;
}
