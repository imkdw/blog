import Category from '../../domain/category.model';

export interface GetCategoriesWithChildrenResult extends Category {
  children: Category[];
}
