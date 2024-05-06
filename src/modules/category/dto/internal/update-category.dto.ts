import Category from '../../entities/category.entity';

export interface UpdateCategoryDto extends Partial<Pick<Category, 'name' | 'param'>> {}
