import Category from '../domain/category.domain';
import { GetCategoriesDto, ResponseCreateCategoryDto, ResponseGetCategoriesDto } from '../dto/response/category.dto';
import { GetCategoriesWithChildrenResult } from '../dto/internal/category.dto';

export const toResponseGetCategoriesDto = (result: GetCategoriesWithChildrenResult[]): ResponseGetCategoriesDto => {
  const categories = result.map(
    (category): GetCategoriesDto => ({
      id: category.id,
      name: category.name,
      param: category.param,
      children: category.children.map((child) => ({
        id: child.id,
        name: child.name,
        param: child.param,
      })),
    }),
  );

  return { categories };
};

export const toResponseCreateCategoryDto = (_category: Category): ResponseCreateCategoryDto => ({
  id: _category.id,
  name: _category.name,
  param: _category.param,
});
