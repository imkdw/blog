import { Injectable } from '@nestjs/common';

import Category from '../domain/category.entity';
import { CategoryRepository } from '../types/category.repository';
import { toCategory } from '../mapper/category.mapper';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';

@Injectable()
export default class CategoryPrismaRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAllCategories(): Promise<Category[]> {
    const rows = await this.prisma.category.findMany({
      where: { deleteAt: null },
    });

    return rows.map(toCategory);
  }

  async findCategoriesByParentId(parentId: number): Promise<Category[]> {
    const rows = await this.prisma.category.findMany({
      where: { parentId },
    });

    return rows.map(toCategory);
  }

  async findCategoryById(id: number): Promise<Category> {
    const row = await this.prisma.category.findUnique({
      where: { id },
    });

    return row ? toCategory(row) : null;
  }

  async saveCategory(category: Category): Promise<Category> {
    const createdRow = await this.prisma.category.create({ data: category });
    return toCategory(createdRow);
  }

  async findCategoryByName(name: string): Promise<Category> {
    const row = await this.prisma.category.findUnique({ where: { name } });
    return row ? toCategory(row) : null;
  }
}
