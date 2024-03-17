import Category from '../../domain/entities/category.entity';

export interface GetCategoriesWithChildrenResult extends Category {
  children: Category[];
}

export interface CreateCategoryDto {
  name: string;
  param: string;
  parentId?: number;
}
