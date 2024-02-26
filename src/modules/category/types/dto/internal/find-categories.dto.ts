import { IGetCategoryFilter } from '../request/get-category.dto';
import { FindParentCategoryDto } from '../response/find-categories.dto';

export interface FindCategoriesDto {
  filter: IGetCategoryFilter;
  parentId: number | null;
}

export interface FindCategoriesResult {
  categories: FindParentCategoryDto[];
}
