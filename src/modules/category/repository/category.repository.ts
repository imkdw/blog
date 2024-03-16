import { Inject, Injectable } from '@nestjs/common';
import { CategoryMapperKey, ICategoryMapper, ICategoryRepository } from '../interfaces/category.interface';
import PrismaService from '../../../infra/database/prisma/service/prisma.service';
import { FindOption } from '../../../common/interfaces/find-option.interface';
import Category from '../domain/category.model';

@Injectable()
export default class CategoryRepository implements ICategoryRepository {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CategoryMapperKey) private readonly categoryMapper: ICategoryMapper,
  ) {}

  async findAll(option: FindOption): Promise<Category[]> {
    const rows = await this.prisma.category.findMany({
      where: { ...(option.includeDeleted ? {} : { deleteAt: null }) },
    });

    return rows.map(this.categoryMapper.toCategory);
  }
}
