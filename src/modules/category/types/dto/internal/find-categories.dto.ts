import { FindParentCategoryDto } from '../response/find-categories.dto';

export interface FindCategoriesDto {
  parentParam: string | null;
}

export interface FindCategoriesResult {
  categories: FindParentCategoryDto[];
}
