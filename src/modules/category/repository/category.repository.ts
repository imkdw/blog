import { Injectable } from '@nestjs/common';
import { ICategoryRepository } from '../interfaces/category.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import Category from '../domain/category.domain';
import UpdateCategory from '../domain/update';

@Injectable()
export default class CategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findMany(dto: Partial<Category>, option: FindOption): Promise<Category[]> {
    const rows = await this.prisma.category.findMany({
      where: { ...dto, ...(!option.includeDeleted && { deleteAt: null }) },
    });

    return rows.map((row) => new Category(row));
  }

  async findOne(dto: Partial<Category>, option: FindOption): Promise<Category | null> {
    const row = await this.prisma.category.findFirst({
      where: { ...dto, ...(!option.includeDeleted && { deleteAt: null }) },
    });

    return row ? new Category(row) : null;
  }

  async save(data: Category): Promise<Category> {
    const row = await this.prisma.category.create({ data });
    return new Category(row);
  }

  async delete(categoryId: number): Promise<void> {
    await this.prisma.category.delete({ where: { id: categoryId } });
  }

  async update(categoryId: number, data: UpdateCategory): Promise<void> {
    await this.prisma.category.update({ where: { id: categoryId }, data });
  }
}
