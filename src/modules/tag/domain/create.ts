import { PickType } from '@nestjs/swagger';
import Tag from './tag.domain';

export default class CreateTag extends PickType(Tag, ['name']) {
  constructor(data: CreateTag) {
    super();
    this.name = data.name;
  }
}
