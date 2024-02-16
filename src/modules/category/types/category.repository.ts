import Category from '../domain/category.entity';

export const CategoryRepositorySymbol = Symbol('CategoryRepository');
export interface CategoryRepository {
  saveCategory(category: Category): Category;

  findCategoryById(id: number): Category | null;

  findCategoriesByParentId(parentId: number): Category[];
}
