import { tag } from '@prisma/client';
import Tag from '../domain/tag.entity';

// eslint-disable-next-line import/prefer-default-export
export function toTag(_tag: tag): Tag {
  return _tag;
}
