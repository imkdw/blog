import { Test } from '@nestjs/testing';
import CategoryController from '../../controller/category.controller';
import CategoryServiceStub from '../stubs/category.service.stub';
import { CategoryServiceKey } from '../../interfaces/category.interface';
import { RequestCreateCategoryDto } from '../../dto/request/category.dto';
import { ResponseCreateCategoryDto } from '../../dto/response/category.dto';

describe('CategoryController', () => {
  let categoryController: CategoryController;
  let categoryService: CategoryServiceStub;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [
        {
          provide: CategoryServiceKey,
          useClass: CategoryServiceStub,
        },
      ],
    }).compile();

    categoryController = module.get<CategoryController>(CategoryController);
    categoryService = module.get<CategoryServiceStub>(CategoryServiceKey);
    categoryService.reset();
  });

  describe('getCategories', () => {
    it('카테고리 목록을 반환한다', async () => {
      // when
      const result = await categoryController.getCategories();

      // then
      expect(result).toEqual({ categories: [] });
    });
  });

  describe('createCategory', () => {
    it('카테고리를 생성하고 생성된 카테고리의 정보를 반환한다', async () => {
      // given
      const createDto: RequestCreateCategoryDto = {
        name: '카테고리1',
        param: 'category1',
        parentId: null,
      };

      // when
      const createdCategory = await categoryController.createCategory(createDto);

      // then
      const responseDto: ResponseCreateCategoryDto = {
        id: 1,
        name: '카테고리1',
        param: 'category1',
      };
      expect(createdCategory).toEqual(responseDto);
    });
  });

  describe('deleteCategory', () => {
    it('카테고리를 삭제한다', async () => {
      // when
      await categoryController.deleteCategory(1);

      // then
      expect(categoryService.isCallDelete).toBeTruthy();
    });
  });

  describe('updateCategory', () => {
    it('카테고리를 수정한다', async () => {
      // given
      const updateDto: RequestCreateCategoryDto = {
        name: '카테고리1',
        param: 'category1',
        parentId: null,
      };

      // when
      await categoryController.updateCategory(1, updateDto);

      // then
      expect(categoryService.isCallUpdate).toBeTruthy();
    });
  });
});
