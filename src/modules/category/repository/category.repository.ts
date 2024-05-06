import { Injectable } from '@nestjs/common';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import Category from '../entities/category.entity';
import { UpdateCategoryDto } from '../dto/internal/update-category.dto';

@Injectable()
export default class CategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(data: Category): Promise<Category> {
    const row = await this.prisma.category.create({ data });
    return new Category(row);
  }

  async delete(categoryId: number): Promise<void> {
    await this.prisma.category.delete({ where: { id: categoryId } });
  }

  async update(categoryId: number, data: UpdateCategoryDto): Promise<void> {
    await this.prisma.category.update({ where: { id: categoryId }, data });
  }

  async findById(id: number, option?: FindOption): Promise<Category | null> {
    const row = await this.prisma.category.findUnique({
      where: { id, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new Category(row) : null;
  }

  async findByName(name: string, option?: FindOption): Promise<Category | null> {
    const row = await this.prisma.category.findUnique({
      where: { name, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new Category(row) : null;
  }

  async findByParam(param: string, option?: FindOption): Promise<Category | null> {
    const row = await this.prisma.category.findUnique({
      where: { param, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new Category(row) : null;
  }

  async findByParentId(parentId: number, option?: FindOption): Promise<Category> {
    const row = await this.prisma.category.findFirst({
      where: { parentId, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new Category(row) : null;
  }

  async findAll(option?: FindOption): Promise<Category[]> {
    const rows = await this.prisma.category.findMany({
      where: { ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return rows.map((row) => new Category(row));
  }

  async findManyByParentId(parentId: number, option?: FindOption): Promise<Category[]> {
    const rows = await this.prisma.category.findMany({
      where: { parentId, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return rows.map((row) => new Category(row));
  }

  async findParentCategories(option?: FindOption): Promise<Category[]> {
    const rows = await this.prisma.category.findMany({
      where: { parentId: null, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return rows.map((row) => new Category(row));
  }
}
