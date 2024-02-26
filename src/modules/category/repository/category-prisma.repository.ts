import { Injectable } from '@nestjs/common';

import Category from '../domain/category.entity';
import { CategoryRepository } from '../types/category.repository';
import { toCategory } from '../mapper/category.mapper';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';

@Injectable()
export default class CategoryPrismaRepository implements CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findParentCategories(): Promise<Category[] | []> {
    const rows = await this.prisma.category.findMany({
      where: { parentId: null, deleteAt: null },
    });

    return rows.map(toCategory);
  }

  async findChildCategories(parentId: number): Promise<Category[] | []> {
    console.log(parentId);
    const rows = await this.prisma.category.findMany({
      where: { parentId, deleteAt: null },
    });

    return rows.map(toCategory);
  }

  async findCategoriesByParentId(parentId: number): Promise<Category[]> {
    const rows = await this.prisma.category.findMany({
      where: { parentId, deleteAt: null },
    });

    return rows.map(toCategory);
  }

  async findCategoryById(id: number): Promise<Category> {
    const row = await this.prisma.category.findUnique({
      where: { id, deleteAt: null },
    });

    return row ? toCategory(row) : null;
  }

  async saveCategory(category: Category): Promise<Category> {
    const createdRow = await this.prisma.category.create({ data: category });
    return toCategory(createdRow);
  }

  async findCategoryByName(name: string): Promise<Category> {
    const row = await this.prisma.category.findUnique({ where: { name, deleteAt: null } });
    return row ? toCategory(row) : null;
  }

  async findCategoryByParentId(parentId: number): Promise<Category | null> {
    const row = await this.prisma.category.findFirst({ where: { parentId, deleteAt: null } });
    return row ? toCategory(row) : null;
  }
}
