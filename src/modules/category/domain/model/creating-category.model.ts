import { PickType } from '@nestjs/swagger';
import Category from '../entities/category.entity';

export default class CreatingCategory extends PickType(Category, ['parentId', 'name', 'param', 'sort']) {
  constructor(category: CreatingCategory) {
    super(category);
    this.parentId = category.parentId;
    this.name = category.name;
    this.param = category.param;
    this.sort = category.sort;
  }
}
