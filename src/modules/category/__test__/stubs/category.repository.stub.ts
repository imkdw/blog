import { FindOption } from '../../../../common/interfaces/find-option.interface';
import { UpdateCategoryDto } from '../../dto/internal/category.dto';
import Category from '../../entities/category.entity';
import { ICategoryRepository } from '../../interfaces/category.interface';

export default class CategoryRepositoryStub implements ICategoryRepository {
  private memory: Category[] = [];

  isCallDelete = false;

  isCallUpdate = false;

  async delete(categoryId: number): Promise<void> {
    this.isCallDelete = true;
    const index = this.memory.findIndex((category) => category.id === categoryId);
    if (index === -1) return;

    this.memory[index].deleteAt = new Date();
  }

  async findAll(option?: FindOption): Promise<Category[]> {
    if (!option?.includeDeleted) {
      this.memory.filter((category) => !category.deleteAt);
    }

    return this.memory;
  }

  async findById(id: number, option?: FindOption): Promise<Category | null> {
    const category = this.memory.find((item) => item.id === id);

    if (!category) return null;
    if (option?.includeDeleted && category.deleteAt) return null;

    return category;
  }

  async findByName(name: string, option?: FindOption): Promise<Category> {
    const category = this.memory.find((item) => item.name === name);

    if (!category) return null;
    if (!option?.includeDeleted && category.deleteAt) return null;

    return category;
  }

  async findByParentId(parentId: number, option?: FindOption): Promise<Category> {
    const category = this.memory.find((item) => item.parentId === parentId);
    if (!category) return null;
    if (!option?.includeDeleted && category.deleteAt) return null;

    return category;
  }

  async findByParam(param: string, option?: FindOption): Promise<Category> {
    const category = this.memory.find((item) => item.param === param);

    if (!category) return null;
    if (option?.includeDeleted && category.deleteAt) return null;

    return category;
  }

  async findManyByParentId(parentId: number, option?: FindOption): Promise<Category[]> {
    const categories = this.memory.filter((item) => item.parentId === parentId);
    if (!option?.includeDeleted) {
      return categories.filter((category) => !category.deleteAt);
    }

    return categories;
  }

  async findParentCategories(option?: FindOption): Promise<Category[]> {
    const categories = this.memory.filter((item) => !item.parentId);
    if (!option?.includeDeleted) {
      return categories.filter((category) => !category.deleteAt);
    }

    return categories;
  }

  async save(data: Category): Promise<Category> {
    const id = this.memory.length + 1;

    const category = new Category({
      id,
      name: data.name,
      param: data.param,
      parentId: data.parentId,
      sort: data.sort,
    });

    this.memory.push(category);

    return category;
  }

  async update(categoryId: number, data: UpdateCategoryDto): Promise<void> {
    this.isCallUpdate = true;
    const index = this.memory.findIndex((category) => category.id === categoryId);
    if (index === -1) return;

    this.memory[index] = {
      ...this.memory[index],
      ...data,
    };
  }

  reset() {
    this.memory = [];
    this.isCallDelete = false;
    this.isCallUpdate = false;
  }
}
