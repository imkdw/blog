/* eslint-disable @typescript-eslint/no-unused-vars */
import { FindOption } from '../../../../common/interfaces/find-option.interface';
import { CreateCategoryDto, GetCategoriesWithChildrenResult, UpdateCategoryDto } from '../../dto/internal/category.dto';
import CategoryEntity from '../../entities/category.entity';
import { ICategoryService } from '../../interfaces/category.interface';

export default class CategoryServiceStub implements ICategoryService {
  isCallDelete = false;

  isCallUpdate = false;

  async createCategory(dto: CreateCategoryDto): Promise<CategoryEntity> {
    return new CategoryEntity({
      id: 1,
      name: dto.name,
      param: dto.param,
      parentId: dto.parentId,
      sort: 1,
    });
  }

  async deleteCategory(categoryId: number): Promise<void> {
    this.isCallDelete = true;
  }

  async findById(id: number, option?: FindOption): Promise<CategoryEntity | null> {
    return new CategoryEntity({
      id: 1,
      name: '',
      param: '',
      parentId: null,
      sort: 1,
    });
  }

  async findByName(name: string, option?: FindOption): Promise<CategoryEntity | null> {
    return new CategoryEntity({
      id: 1,
      name: '',
      param: '',
      parentId: null,
      sort: 1,
    });
  }

  async findByParam(param: string, option?: FindOption): Promise<CategoryEntity | null> {
    return new CategoryEntity({
      id: 1,
      name: '',
      param: '',
      parentId: null,
      sort: 1,
    });
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
