import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../types/category.repository';
import Category from '../domain/category.entity';
import { toCategory } from '../mapper/category.mapper';

@Injectable()
export default class CategoryMemoryRepository implements CategoryRepository {
  private readonly categories: Category[] = [];

  saveCategory(category: Category): Category {
    this.categories.push(category);
    const createdCategory = this.categories.find((c) => c.id === category.id);
    return toCategory(createdCategory);
  }
}
