import { category } from '@prisma/client';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import Category from '../domain/category.model';
import { ResponseGetCategoriesDto } from '../dto/response/category.dto';
import { GetCategoriesWithChildrenResult } from '../dto/internal/category.dto';

export const CategoryServiceKey = Symbol('CategoryService');
export interface ICategoryService {
  getCategoriesWithChildren(): Promise<GetCategoriesWithChildrenResult[]>;
}

export const CategoryRepositoryKey = Symbol('CategoryRepository');
export interface ICategoryRepository {
  findAll(option: FindOption): Promise<Category[]>;
}

export const CategoryMapperKey = Symbol('CategoryMapper');
export interface ICategoryMapper {
  toCategory(_category: category): Category;

  toResponseGetCategoriesDto(result: GetCategoriesWithChildrenResult[]): ResponseGetCategoriesDto;
}
