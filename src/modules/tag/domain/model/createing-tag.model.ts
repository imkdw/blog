import { PickType } from '@nestjs/swagger';
import Tag from '../entities/tag.entity';

export default class CreatingTag extends PickType(Tag, ['name']) {
  constructor(_tag: CreatingTag) {
    super(_tag);
    this.name = _tag.name;
  }
}
