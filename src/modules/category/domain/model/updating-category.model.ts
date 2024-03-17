import { PickType } from '@nestjs/swagger';
import Category from '../entities/category.entity';

export default class UpdatingCategory extends PickType(Category, ['name', 'param']) {
  constructor(category: UpdatingCategory) {
    super(category);
    this.name = category.name;
    this.param = category.param;
  }
}
