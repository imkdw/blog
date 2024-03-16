import { Injectable } from '@nestjs/common';
import { category } from '@prisma/client';

import { ICategoryMapper } from '../interfaces/category.interface';
import Category from '../domain/category.model';
import { GetCategoriesDto, ResponseGetCategoriesDto } from '../dto/response/category.dto';
import { GetCategoriesWithChildrenResult } from '../dto/internal/category.dto';

@Injectable()
export default class CategoryMapper implements ICategoryMapper {
  toCategory(_category: category): Category {
    return new Category(_category);
  }

  toResponseGetCategoriesDto(result: GetCategoriesWithChildrenResult[]): ResponseGetCategoriesDto {
    const categories = result.map(
      (_category): GetCategoriesDto => ({
        id: _category.id,
        name: _category.name,
        param: _category.param,
        children: _category.children.map((child) => ({
          id: child.id,
          name: child.name,
          param: child.param,
        })),
      }),
    );

    return { categories };
  }
}
