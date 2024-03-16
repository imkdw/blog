import { Inject, Injectable } from '@nestjs/common';
import {
  CategoryMapperKey,
  CategoryRepositoryKey,
  ICategoryMapper,
  ICategoryRepository,
  ICategoryService,
} from '../interfaces/category.interface';
import { GetCategoriesWithChildrenResult } from '../dto/internal/category.dto';

@Injectable()
export default class CategoryService implements ICategoryService {
  constructor(
    @Inject(CategoryRepositoryKey) private readonly categoryRepository: ICategoryRepository,
    @Inject(CategoryMapperKey) private readonly categoryMapper: ICategoryMapper,
  ) {}

  async getCategoriesWithChildren(): Promise<GetCategoriesWithChildrenResult[]> {
    const categories = await this.categoryRepository.findAll({ includeDeleted: false });

    // 부모, 자식 카테고리를 분리
    const parentCategories = categories.filter((category) => category.parentId === null);
    const childCategories = categories.filter((category) => category.parentId !== null);

    // 부모 카테고리에 자식 카테고리를 추가
    const categoriesWithChildren = parentCategories.map((parentCategory) => ({
      ...parentCategory,
      children: childCategories.filter((childCategory) => childCategory.parentId === parentCategory.id),
    }));

    return categoriesWithChildren;
  }
}
