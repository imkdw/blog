import Category from '../../domain/category.domain';

export interface GetCategoriesWithChildrenResult extends Category {
  children: Category[];
}

export interface CreateCategoryDto {
  name: string;
  param: string;
  parentId?: number;
}

export interface UpdateCategoryDto {
  name?: string;
  param?: string;
}
