import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CategoryService } from '../types/category.service';
import { CreateCategoryDto } from '../types/dto/internal/create-category.dto';
import Category from '../domain/category.entity';
import { CategoryRepository, CategoryRepositorySymbol } from '../types/category.repository';
import { FindParentCategoryDto } from '../types/dto/response/find-categories.dto';
import { FindCategoriesDto, FindCategoriesResult } from '../types/dto/internal/find-categories.dto';

@Injectable()
export default class CategoryServiceImpl implements CategoryService {
  constructor(@Inject(CategoryRepositorySymbol) private readonly categoryRepository: CategoryRepository) {}

  async createCategory(dto: CreateCategoryDto, userId: string): Promise<Category> {
    const { name, parentId, param } = dto;

    // 중복 카테고리 검사
    const categoryByName = await this.categoryRepository.findByName(name);
    if (categoryByName) {
      // TODO: 에러처리
      throw new ConflictException('이미 존재하는 카테고리 이름입니다.');
    }

    // 부모 카테고리 존재여부 검사
    if (parentId) {
      // TODO: 에러처리
      const parentCategory = await this.categoryRepository.findById(parentId);

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

    const category = new Category({
      name,
      parentId: parentId || null,
      sort,
      param,
      createUser: userId,
      updateUser: userId,
    });
    const createdCategory = await this.categoryRepository.saveCategory(category);

    return createdCategory;
  }

  async findParentCategories(): Promise<FindCategoriesResult> {
    const categories = await this.categoryRepository.findParentCategories();

    const result = categories.map(
      (category): FindParentCategoryDto => ({
        id: category.id,
        name: category.name,
        sort: category.sort,
        param: category.param,
      }),
    );

    return { categories: result };
  }

  async findChildCategories(parentParam: string): Promise<FindCategoriesResult> {
    const parentCategory = await this.categoryRepository.findByParam(parentParam);
    if (!parentCategory) {
      // TODO: 에러처리
      throw new NotFoundException('부모 카테고리가 존재하지 않습니다.');
    }

    const categories = await this.categoryRepository.findCategoriesByParentId(parentCategory.id);
    const result = categories.map(
      (category): FindParentCategoryDto => ({
        id: category.id,
        name: category.name,
        sort: category.sort,
        param: category.param,
      }),
    );

    return { categories: result };
  }

  async findCategories(dto: FindCategoriesDto): Promise<FindCategoriesResult> {
    const { parentParam } = dto;

    let categories: Category[];

    if (parentParam) {
      const parentByParam = await this.categoryRepository.findByParam(parentParam);
      if (!parentByParam) {
        // TODO: 에러처리
        throw new BadRequestException('부모 카테고리가 존재하지 않습니다.');
      }

      categories = await this.categoryRepository.findCategoriesByParentId(parentByParam.id);
    } else {
      categories = await this.categoryRepository.findParentCategories();
    }

    const result = categories.map(
      (category): FindParentCategoryDto => ({
        id: category.id,
        name: category.name,
        sort: category.sort,
        param: category.param,
      }),
    );

    return { categories: result };
  }

  async findById(categoryId: number): Promise<Category | null> {
    const category = await this.categoryRepository.findById(categoryId);
    return category;
  }

  async findByParentId(parentId: number): Promise<Category | null> {
    const category = await this.categoryRepository.findByParentId(parentId);
    return category;
  }
}
