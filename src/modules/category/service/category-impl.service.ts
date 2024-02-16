import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryService } from '../types/category.service';
import { CreateCategoryDto } from '../types/dto/internal/create-category.dto';
import Category from '../domain/category.entity';
import { CategoryRepository, CategoryRepositorySymbol } from '../types/category.repository';

@Injectable()
export default class CategoryServiceImpl implements CategoryService {
  constructor(@Inject(CategoryRepositorySymbol) private readonly categoryRepository: CategoryRepository) {}

  createCategory(dto: CreateCategoryDto): Category {
    const { name, parentId } = dto;

    const parentCategory = this.categoryRepository.findCategoryById(parentId);

    // 부모 카테고리 ID를 받았으나 존재하지 않는경우
    if (parentId && !parentCategory) {
      // TODO: 에러처리
      throw new NotFoundException('부모 카테고리가 존재하지 않습니다.');
    }
    const category = new Category({ name, parentId });
    return this.categoryRepository.saveCategory(category);
  }
}
