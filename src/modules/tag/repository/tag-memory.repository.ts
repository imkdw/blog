import { Injectable } from '@nestjs/common';
import { TagRepository } from '../types/tag.repository';

@Injectable()
export default class TagMemoryRepository implements TagRepository {}
