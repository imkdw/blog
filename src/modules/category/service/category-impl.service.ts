import { ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryService } from '../types/category.service';
import { CreateCategoryDto } from '../types/dto/internal/create-category.dto';
import Category from '../domain/category.entity';
import { CategoryRepository, CategoryRepositorySymbol } from '../types/category.repository';

@Injectable()
export default class CategoryServiceImpl implements CategoryService {
  constructor(@Inject(CategoryRepositorySymbol) private readonly categoryRepository: CategoryRepository) {}

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const { name, parentId } = dto;

    // 중복 카테고리 검사
    const categoryByName = await this.categoryRepository.findCategoryByName(name);
    if (categoryByName) {
      // TODO: 에러처리
      throw new ConflictException('이미 존재하는 카테고리 이름입니다.');
    }

    // 부모 카테고리 존재여부 검사
    if (parentId) {
      // TODO: 에러처리
      const parentCategory = await this.categoryRepository.findCategoryById(parentId);

      if (!parentCategory) {
        throw new NotFoundException('부모 카테고리가 존재하지 않습니다.');
      }
    }

    /**
     * 부모 카테고리 생성 : 부모 카테고리 갯수 + 1
     * 자식 카테고리 생성 : 특정 부모의 자식 카테고리 갯수 + 1
     */
    const categories = await this.categoryRepository.findCategoriesByParentId(parentId || null);
    const sort = categories.length + 1;

    // TODO: 작성자 처리하기
    const category = new Category({
      name,
      parentId: parentId || null,
      sort,
      createUser: 'tempUSer',
      updateUser: 'tempUser',
    });
    const createdCategory = await this.categoryRepository.saveCategory(category);

    return createdCategory;
  }

  async findCategories(): Promise<Category[] | never[]> {
    const categories = await this.categoryRepository.findAllCategories();
    return categories;
  }
}
