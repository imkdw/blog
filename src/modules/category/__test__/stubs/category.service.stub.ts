/* eslint-disable @typescript-eslint/no-unused-vars */
import { FindOption } from '../../../../common/interfaces/find-option.interface';
import { CreateCategoryDto, GetCategoriesWithChildrenResult, UpdateCategoryDto } from '../../dto/internal/category.dto';
import Category, { CategoryBuilder } from '../../entities/category.entity';
import { ICategoryService } from '../../interfaces/category.interface';

export default class CategoryServiceStub implements ICategoryService {
  isCallDelete = false;

  isCallUpdate = false;

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    return new CategoryBuilder().id(1).name(dto.name).param(dto.param).parentId(dto.parentId).sort(1).build();
  }

  async deleteCategory(categoryId: number): Promise<void> {
    this.isCallDelete = true;
  }

  async findById(id: number, option?: FindOption): Promise<Category | null> {
    if (id === 999) return null;

    return new CategoryBuilder().id(id).build();
  }

  async findByName(name: string, option?: FindOption): Promise<Category | null> {
    if (name === '999') return null;
    return new CategoryBuilder().name(name).build();
  }

  async findByParam(param: string, option?: FindOption): Promise<Category | null> {
    if (param === '999') return null;
    return new CategoryBuilder().param(param).build();
  }

  async getCategoriesWithChildren(): Promise<GetCategoriesWithChildrenResult[]> {
    return [];
  }

  async updateCategory(categoryId: number, dto: UpdateCategoryDto): Promise<void> {
    this.isCallUpdate = true;
  }

  reset() {
    this.isCallDelete = false;
    this.isCallUpdate = false;
  }
}
