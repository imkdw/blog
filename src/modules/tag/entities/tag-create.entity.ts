import { PickType } from '@nestjs/swagger';
import TagEntity from './tag.entity';

export default class TagCreateEntity extends PickType(TagEntity, ['name']) {
  constructor(data: TagCreateEntity) {
    super();
    this.name = data.name;
  }
}
