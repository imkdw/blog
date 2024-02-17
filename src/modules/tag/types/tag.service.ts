import Tag from '../domain/tag.entity';
import { CreateTagDto } from './dto/internal/create-tag.dto';

export const TagServiceSymbol = Symbol('TagService');
export interface TagService {
  createTag(dto: CreateTagDto): Promise<Tag>;
}
