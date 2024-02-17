import Category from '../domain/category.entity';

export const CategoryRepositorySymbol = Symbol('CategoryRepository');
export interface CategoryRepository {
  saveCategory(category: Category): Promise<Category>;

  findAllCategories(): Promise<Category[] | never[]>;

  findCategoryById(id: number): Promise<Category | null>;

  findCategoryByName(name: string): Promise<Category | null>;

  findCategoriesByParentId(parentId: number): Promise<Category[] | never[]>;
}
