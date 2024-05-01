import CategoryDto from '../category.dto';

export interface UpdateCategoryDto extends Pick<CategoryDto, 'name' | 'param'> {}
