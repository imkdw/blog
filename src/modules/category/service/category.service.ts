import { Inject, Injectable } from '@nestjs/common';
import { CategoryRepositoryKey, ICategoryRepository, ICategoryService } from '../interfaces/category.interface';
import { CreateCategoryDto, GetCategoriesWithChildrenResult, UpdateCategoryDto } from '../dto/internal/category.dto';
import { ExistCategoryNameException, ExistCategoryParamException } from '../../../common/exceptions/409';
import { CategoryNotFoundException } from '../../../common/exceptions/404';
import CategoryEntity from '../entities/category.entity';
import { CategoryCreateEntityBuilder } from '../entities/category-create.entity';
import { FindOption } from '../../../common/interfaces/find-option.interface';

@Injectable()
export default class CategoryService implements ICategoryService {
  constructor(@Inject(CategoryRepositoryKey) private readonly categoryRepository: ICategoryRepository) {}

  async getCategoriesWithChildren(): Promise<GetCategoriesWithChildrenResult[]> {
    const categories = await this.categoryRepository.findAll();

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

  async createCategory(dto: CreateCategoryDto): Promise<CategoryEntity> {
    const categoryByName = await this.categoryRepository.findByName(dto.name, { includeDeleted: true });
    if (categoryByName) throw new ExistCategoryNameException();

    const categoryByParam = await this.categoryRepository.findByParam(dto.param, { includeDeleted: true });
    if (categoryByParam) throw new ExistCategoryParamException();

    let sort: number;
    if (dto?.parentId) {
      const parentCategory = await this.categoryRepository.findById(dto.parentId);
      if (!parentCategory) throw new CategoryNotFoundException();

      const childCategories = await this.categoryRepository.findManyByParentId(dto.parentId);
      sort = childCategories.length + 1;
    } else {
      const parentCategories = await this.categoryRepository.findParentCategories();
      sort = parentCategories.length + 1;
    }

    const categoryCreateEntity = new CategoryCreateEntityBuilder()
      .setName(dto.name)
      .setParam(dto.param)
      .setParentId(dto.parentId || null)
      .setSort(sort)
      .build();
    const createdCategory = await this.categoryRepository.save(categoryCreateEntity);

    return createdCategory;
  }

  async deleteCategory(categoryId: number): Promise<void> {
    const existCategory = await this.categoryRepository.findById(categoryId);
    if (!existCategory) throw new CategoryNotFoundException(categoryId.toString());

    await this.categoryRepository.delete(categoryId);
  }

  async updateCategory(categoryId: number, dto: UpdateCategoryDto): Promise<void> {
    const existCategory = await this.categoryRepository.findById(categoryId);
    if (!existCategory) throw new CategoryNotFoundException();

    if (dto?.name) {
      const categoryByName = await this.categoryRepository.findByName(dto.name, { includeDeleted: true });
      if (categoryByName) throw new ExistCategoryNameException();
    }

    if (dto?.param) {
      const categoryByParam = await this.categoryRepository.findByParam(dto.param, { includeDeleted: true });
      if (categoryByParam) throw new ExistCategoryParamException();
    }

    await this.categoryRepository.update(categoryId, dto);
  }

  async findByParam(param: string, option?: FindOption): Promise<CategoryEntity | null> {
    const category = await this.categoryRepository.findByParam(param, option);
    return category;
  }

  async findById(id: number, option?: FindOption): Promise<CategoryEntity | null> {
    const category = await this.categoryRepository.findById(id, option);
    return category;
  }

  async findByName(name: string, option?: FindOption): Promise<CategoryEntity | null> {
    const category = await this.categoryRepository.findByName(name, option);
    return category;
  }
}
