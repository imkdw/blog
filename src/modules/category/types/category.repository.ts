import Category from '../domain/category.entity';

export const CategoryRepositorySymbol = Symbol('CategoryRepository');
export interface CategoryRepository {
  saveCategory(category: Category): Promise<Category>;

  findParentCategories(): Promise<Category[] | []>;

  findChildCategories(parentId: number): Promise<Category[] | []>;

  findById(id: number): Promise<Category | null>;

  findByName(name: string): Promise<Category | null>;

  findByParam(param: string): Promise<Category | null>;

  findByParentId(parentId: number): Promise<Category | null>;

  findCategoriesByParentId(parentId: number): Promise<Category[] | []>;
}
