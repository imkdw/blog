import CategoryEntity from '../../entities/category.entity';

export interface GetCategoriesWithChildrenResult extends CategoryEntity {
  children: CategoryEntity[];
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
