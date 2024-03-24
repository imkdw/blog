import { Inject, Injectable } from '@nestjs/common';
import { CategoryMapperKey, ICategoryMapper, ICategoryRepository } from '../interfaces/category.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import Category from '../domain/entities/category.entity';
import UpdatingCategory from '../domain/model/updating-category.model';

@Injectable()
export default class CategoryRepository implements ICategoryRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CategoryMapperKey) private readonly categoryMapper: ICategoryMapper,
  ) {}

  async findMany(dto: Partial<Category>, option: FindOption): Promise<Category[]> {
    const rows = await this.prisma.category.findMany({
      where: { ...dto, ...(!option.includeDeleted && { deleteAt: null }) },
    });

    return rows.map(this.categoryMapper.toCategory);
  }

  async findOne(dto: Partial<Category>, option: FindOption): Promise<Category | null> {
    const row = await this.prisma.category.findFirst({
      where: { ...dto, ...(!option.includeDeleted && { deleteAt: null }) },
    });

    return row ? this.categoryMapper.toCategory(row) : null;
  }

  async save(data: Category): Promise<Category> {
    const row = await this.prisma.category.create({ data });
    return this.categoryMapper.toCategory(row);
  }

  async delete(categoryId: number): Promise<void> {
    await this.prisma.category.delete({ where: { id: categoryId } });
  }

  async update(categoryId: number, data: UpdatingCategory): Promise<void> {
    await this.prisma.category.update({ where: { id: categoryId }, data });
  }
}
