import { PickType } from '@nestjs/swagger';
import Category from './category.domain';

export default class UpdateCategory extends PickType(Category, ['name', 'param']) {
  constructor(category: UpdateCategory) {
    super(category);
    this.name = category.name;
    this.param = category.param;
  }
}
