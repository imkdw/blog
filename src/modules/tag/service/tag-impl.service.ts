import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { TagService } from '../types/Tag.service';
import { CreateTagDto } from '../types/dto/internal/create-tag.dto';
import { TagRepository, TagRepositorySymbol } from '../types/tag.repository';
import Tag from '../domain/tag.entity';
import { SearchTagsResult } from '../types/dto/internal/search-tags.dto';

@Injectable()
export default class TagServiceImpl implements TagService {
  constructor(@Inject(TagRepositorySymbol) private readonly tagRepository: TagRepository) {}

  async createTag(dto: CreateTagDto, userId: string): Promise<Tag> {
    const existTag = await this.tagRepository.findByName(dto.name);
    if (existTag) {
      // TODO: 에러 처리
      throw new ConflictException('이미 존재하는 태그입니다.');
    }

    // 태그 생성
    const tag = new Tag({ name: dto.name, createUser: userId, updateUser: userId });
    const createdTag = await this.tagRepository.createTag(tag);

    return createdTag;
  }

  async searchTags(name: string): Promise<SearchTagsResult | > {
    const tags = await this.tagRepository.findByPartialName(name);

    const searchTags: SearchTagsResult = tags.map((tag) => ({
      id: tag.id,
      name: tag.name,
    }));

    return searchTags;
  }
}
