import { Test } from '@nestjs/testing';
import { CategoryRepositoryKey, CategoryServiceKey } from '../../interfaces/category.interface';
import CategoryService from '../../service/category.service';
import CategoryRepositoryStub from '../stubs/category.repository.stub';
import { CreateCategoryDto, GetCategoriesWithChildrenResult } from '../../dto/internal/category.dto';
import { ExistCategoryNameException, ExistCategoryParamException } from '../../../../common/exceptions/409';
import { CategoryNotFoundException } from '../../../../common/exceptions/404';

describe('CategoryService', () => {
  let categoryService: CategoryService;
  let categoryRepository: CategoryRepositoryStub;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        {
          provide: CategoryServiceKey,
          useClass: CategoryService,
        },
        {
          provide: CategoryRepositoryKey,
          useClass: CategoryRepositoryStub,
        },
      ],
    }).compile();

    categoryService = module.get<CategoryService>(CategoryServiceKey);
    categoryRepository = module.get<CategoryRepositoryStub>(CategoryRepositoryKey);
  });

  describe('getCategoriesWithChildren', () => {
    it('자식 카테고리를 포함한 카테고리 리스트를 반환한다', async () => {
      // given
      const category1 = await categoryRepository.save({
        name: '카테고리1',
        param: 'category1',
        parentId: null,
        sort: 1,
      });
      const category2 = await categoryRepository.save({
        name: '카테고리2',
        param: 'category2',
        parentId: category1.id,
        sort: 2,
      });

      // when
      const result = await categoryService.getCategoriesWithChildren();

      // then
      const categoryWithChildren: GetCategoriesWithChildrenResult[] = [
        {
          id: category1.id,
          name: '카테고리1',
          param: 'category1',
          parentId: null,
          sort: 1,
          createAt: expect.any(Date),
          createUser: null,
          updateAt: expect.any(Date),
          updateUser: null,
          deleteAt: null,
          deleteUser: null,
          children: [
            {
              id: category2.id,
              name: '카테고리2',
              param: 'category2',
              parentId: category1.id,
              sort: 2,
              createAt: expect.any(Date),
              createUser: null,
              updateAt: expect.any(Date),
              updateUser: null,
              deleteAt: null,
              deleteUser: null,
            },
          ],
        },
      ];

      expect(result).toEqual(categoryWithChildren);
    });
  });

  describe('createCategory', () => {
    it('중복된 이름이 존재하는 경우 ExistCategoryNameException 예외를 던진다', async () => {
      // given
      const createDto: CreateCategoryDto = {
        name: '카테고리1',
        param: 'category1',
        parentId: null,
      };
      await categoryRepository.save({
        name: createDto.name,
        param: 'category2',
        parentId: null,
        sort: 1,
      });

      // when
      await expect(categoryService.createCategory(createDto)).rejects.toThrow(ExistCategoryNameException);
    });

    it('중복된 파라미터가 존재하는 경우 ExistCategoryParamException 예외를 던진다', async () => {
      // given
      const createDto: CreateCategoryDto = {
        name: '카테고리1',
        param: 'category1',
        parentId: null,
      };
      await categoryRepository.save({
        name: '카테고리2',
        param: createDto.param,
        parentId: null,
        sort: 1,
      });

      // when, then
      await expect(categoryService.createCategory(createDto)).rejects.toThrow(ExistCategoryParamException);
    });

    describe('부모 카테고리 생성 성공', () => {
      it('기존 카테고리가 없는 경우 sort가 1로 지정된다', async () => {
        // given
        const createDto: CreateCategoryDto = {
          name: '카테고리1',
          param: 'category1',
          parentId: null,
        };

        // when
        const createdCategory = await categoryService.createCategory(createDto);

        // then
        expect(createdCategory.sort).toBe(1);
      });
      it('기존 카테고리가 있는 경우 sort가 기존 카테고리수 + 1로 지정된다', async () => {
        // given
        const createDto: CreateCategoryDto = {
          name: '카테고리1',
          param: 'category1',
          parentId: null,
        };
        await categoryRepository.save({
          name: '카테고리2',
          param: 'category2',
          parentId: null,
          sort: 1,
        });

        // when
        const createdCategory = await categoryService.createCategory(createDto);

        // then
        expect(createdCategory.sort).toBe(2);
      });
    });

    describe('자식 카테고리 생성 성공', () => {
      it('기존 카테고리가 없는 경우 sort가 1로 지정된다', async () => {
        // given
        const parentCategory = await categoryRepository.save({
          name: '카테고리1',
          param: 'category1',
          parentId: null,
          sort: 1,
        });
        const createDto: CreateCategoryDto = {
          name: '카테고리2',
          param: 'category2',
          parentId: parentCategory.id,
        };

        // when
        const createdCategory = await categoryService.createCategory(createDto);

        // then
        expect(createdCategory.sort).toBe(1);
      });
      it('기존 카테고리가 있는 경우 sort가 기존 카테고리수 + 1로 지정된다', async () => {
        // given
        const parentCategory = await categoryRepository.save({
          name: '카테고리1',
          param: 'category1',
          parentId: null,
          sort: 1,
        });
        const createDto: CreateCategoryDto = {
          name: '카테고리2',
          param: 'category2',
          parentId: parentCategory.id,
        };
        await categoryRepository.save({
          name: '카테고리3',
          param: 'category3',
          parentId: parentCategory.id,
          sort: 1,
        });

        // when
        const createdCategory = await categoryService.createCategory(createDto);

        // then
        expect(createdCategory.sort).toBe(2);
      });
    });
  });

  describe('deleteCategory', () => {
    it('존재하지 않는 카테고리를 시도하면 CategoryNotFoundException 예외를 던진다', async () => {
      // when, then
      await expect(categoryService.deleteCategory(999)).rejects.toThrow(CategoryNotFoundException);
    });

    it('카테고리를 삭제한다', async () => {
      const category = await categoryRepository.save({
        name: '카테고리1',
        param: 'category1',
        parentId: null,
        sort: 1,
      });

      // when
      await categoryService.deleteCategory(category.id);

      // then
      expect(categoryRepository.isCallDelete).toBeTruthy();
    });
  });

  describe('updateCategory', () => {
    it('존재하지 않는 카테고리를 시도하면 CategoryNotFoundException 예외를 던진다', async () => {
      // when, then
      await expect(categoryService.updateCategory(999, {})).rejects.toThrow(CategoryNotFoundException);
    });

    it('중복된 이름이 존재하는 경우 ExistCategoryNameException 예외를 던진다', async () => {
      // given
      const category1 = await categoryRepository.save({
        name: '카테고리1',
        param: 'category1',
        parentId: null,
        sort: 1,
      });
      const category2 = await categoryRepository.save({
        name: '카테고리2',
        param: 'category2',
        parentId: null,
        sort: 2,
      });

      // when, then
      await expect(categoryService.updateCategory(category1.id, { name: category2.name })).rejects.toThrow(
        ExistCategoryNameException,
      );
    });

    it('중복된 파라미터가 존재하는 경우 ExistCategoryParamException 예외를 던진다', async () => {
      // given
      const category1 = await categoryRepository.save({
        name: '카테고리1',
        param: 'category1',
        parentId: null,
        sort: 1,
      });
      const category2 = await categoryRepository.save({
        name: '카테고리2',
        param: 'category2',
        parentId: null,
        sort: 2,
      });

      // when, then
      await expect(categoryService.updateCategory(category1.id, { param: category2.param })).rejects.toThrow(
        ExistCategoryParamException,
      );
    });

    it('카테고리를 수정한다', async () => {
      const category = await categoryRepository.save({
        name: '카테고리1',
        param: 'category1',
        parentId: null,
        sort: 1,
      });

      // when
      await categoryService.updateCategory(category.id, { name: '수정된 카테고리1' });

      // then
      expect(categoryRepository.isCallUpdate).toBeTruthy();
    });
  });

  describe('findByParam', () => {
    it('파라미터로 카테고리를 조회한다', async () => {
      const category = await categoryRepository.save({
        name: '카테고리1',
        param: 'category1',
        parentId: null,
        sort: 1,
      });

      // when
      const result = await categoryService.findByParam(category.param);

      // then
      expect(result).toEqual(category);
    });
  });

  describe('findById', () => {
    it('아이디로 카테고리를 조회한다', async () => {
      const category = await categoryRepository.save({
        name: '카테고리1',
        param: 'category1',
        parentId: null,
        sort: 1,
      });

      // when
      const result = await categoryService.findById(category.id);

      // then
      expect(result).toEqual(category);
    });
  });

  describe('findByName', () => {
    it('이름으로 카테고리를 조회한다', async () => {
      const category = await categoryRepository.save({
        name: '카테고리1',
        param: 'category1',
        parentId: null,
        sort: 1,
      });

      // when
      const result = await categoryService.findByName(category.name);

      // then
      expect(result).toEqual(category);
    });
  });
});
