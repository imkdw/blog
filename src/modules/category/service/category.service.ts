import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepositoryKey, ICategoryRepository, ICategoryService } from '../interfaces/category.interface';
import { CreateCategoryDto, GetCategoriesWithChildrenResult } from '../dto/internal/category.dto';
import { ExistCategoryNameException, ExistCategoryParamException } from '../../../common/exceptions/409';
import CreatingCategory from '../domain/model/creating-category.model';
import Category from '../domain/entities/category.entity';
import { CategoryNotFoundException } from '../../../common/exceptions/404';

@Injectable()
export default class CategoryService implements ICategoryService {
  constructor(@Inject(CategoryRepositoryKey) private readonly categoryRepository: ICategoryRepository) {}

  async getCategoriesWithChildren(): Promise<GetCategoriesWithChildrenResult[]> {
    const categories = await this.categoryRepository.findMany({}, { includeDeleted: false });

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

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const categoryByName = await this.categoryRepository.findOne({ name: dto.name }, { includeDeleted: true });
    if (categoryByName) throw new ExistCategoryNameException();

    const categoryByParam = await this.categoryRepository.findOne({ param: dto.param }, { includeDeleted: true });
    if (categoryByParam) throw new ExistCategoryParamException();

    let sort: number;
    if (dto?.parentId) {
      const parentCategory = await this.categoryRepository.findOne({ id: dto.parentId }, { includeDeleted: false });
      if (!parentCategory) throw new CategoryNotFoundException();

      const childCategories = await this.categoryRepository.findMany(
        { parentId: dto.parentId },
        { includeDeleted: false },
      );
      sort = childCategories.length + 1;
    } else {
      const parentCategories = await this.categoryRepository.findMany({ parentId: null }, { includeDeleted: false });
      sort = parentCategories.length + 1;
    }

    const creatingCategory = new CreatingCategory({
      name: dto.name,
      param: dto.param,
      parentId: dto.parentId ?? null,
      sort,
    });
    const createdCategory = await this.categoryRepository.save(creatingCategory);

    return createdCategory;
  }

  async deleteCategory(categoryId: number): Promise<void> {
    const existCategory = await this.categoryRepository.findOne({ id: categoryId }, { includeDeleted: false });
    if (existCategory) {
      await this.categoryRepository.delete(categoryId);
    }
  }
}
