import { PickType } from '@nestjs/swagger';
import Category from './category.domain';

export default class CreateCategory extends PickType(Category, ['parentId', 'name', 'param', 'sort']) {
  constructor(category: CreateCategory) {
    super(category);
    this.parentId = category.parentId;
    this.name = category.name;
    this.param = category.param;
    this.sort = category.sort;
  }
}
