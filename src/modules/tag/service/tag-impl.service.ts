import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { TagService } from '../types/Tag.service';
import { CreateTagDto } from '../types/dto/internal/create-tag.dto';
import { TagRepository, TagRepositorySymbol } from '../types/tag.repository';
import Tag from '../domain/tag.entity';

@Injectable()
export default class TagServiceImpl implements TagService {
  constructor(@Inject(TagRepositorySymbol) private readonly tagRepository: TagRepository) {}

  async createTag(dto: CreateTagDto): Promise<Tag> {
    // 기존에 존재하는 태그인지 확인
    const existTag = await this.tagRepository.findByName(dto.name);
    if (existTag) {
      // TODO: 에러 처리
      throw new ConflictException('이미 존재하는 태그입니다.');
    }

    // 태그 생성
    const tag = new Tag({ name: dto.name, createUser: 'temp', updateUser: 'temp' });
    const createdTag = await this.tagRepository.createTag(tag);

    return createdTag;
  }
}
