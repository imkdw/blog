import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../types/category.repository';

@Injectable()
export default class CategoryMemoryRepository implements CategoryRepository {}
