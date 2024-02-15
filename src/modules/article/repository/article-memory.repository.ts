import { Injectable } from '@nestjs/common';
import { ArticleRepository } from '../types/article.repository';

@Injectable()
export default class ArticleMemoryRepository implements ArticleRepository {}
