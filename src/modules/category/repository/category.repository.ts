import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from '../interfaces/category.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import CategoryEntity from '../entities/category.entity';
import CategoryCreateEntity from '../entities/category-create.entity';
import { UpdateCategoryDto } from '../dto/internal/update-category.dto';

@Injectable()
export default class CategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async save(data: CategoryCreateEntity): Promise<CategoryEntity> {
    const row = await this.prisma.category.create({ data });
    return new CategoryEntity(row);
  }

  async delete(categoryId: number): Promise<void> {
    await this.prisma.category.delete({ where: { id: categoryId } });
  }

  async update(categoryId: number, data: UpdateCategoryDto): Promise<void> {
    await this.prisma.category.update({ where: { id: categoryId }, data });
  }

  async findById(id: number, option?: FindOption): Promise<CategoryEntity | null> {
    const row = await this.prisma.category.findUnique({
      where: { id, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new CategoryEntity(row) : null;
  }

  async findByName(name: string, option?: FindOption): Promise<CategoryEntity | null> {
    const row = await this.prisma.category.findUnique({
      where: { name, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new CategoryEntity(row) : null;
  }

  async findByParam(param: string, option?: FindOption): Promise<CategoryEntity | null> {
    const row = await this.prisma.category.findUnique({
      where: { param, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new CategoryEntity(row) : null;
  }

  async findByParentId(parentId: number, option?: FindOption): Promise<CategoryEntity> {
    const row = await this.prisma.category.findFirst({
      where: { parentId, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return row ? new CategoryEntity(row) : null;
  }

  async findAll(option?: FindOption): Promise<CategoryEntity[]> {
    const rows = await this.prisma.category.findMany({
      where: { ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return rows.map((row) => new CategoryEntity(row));
  }

  async findManyByParentId(parentId: number, option?: FindOption): Promise<CategoryEntity[]> {
    const rows = await this.prisma.category.findMany({
      where: { parentId, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return rows.map((row) => new CategoryEntity(row));
  }

  async findParentCategories(option?: FindOption): Promise<CategoryEntity[]> {
    const rows = await this.prisma.category.findMany({
      where: { parentId: null, ...(option?.includeDeleted ? {} : { deleteAt: null }) },
    });

    return rows.map((row) => new CategoryEntity(row));
  }
}
