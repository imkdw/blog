import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { TagService } from '../types/tag.service';
import { CreateTagDto } from '../types/dto/internal/create-tag.dto';
import { TagRepository, TagRepositorySymbol } from '../types/tag.repository';
import Tag from '../domain/tag.entity';
import { TX } from '../../../common/types/prisma';
import { GetTagsDto } from '../types/dto/internal/get-tags.dto';
import { getTagKeys } from '../types/dto/request/get-tags.dto';
import { ArticleTagService, ArticleTagServiceSymbol } from '../../article-tag/types/service/article-tag.service';

@Injectable()
export default class TagServiceImpl implements TagService {
  constructor(
    @Inject(TagRepositorySymbol) private readonly tagRepository: TagRepository,
    @Inject(ArticleTagServiceSymbol) private readonly articleTagService: ArticleTagService,
  ) {}

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

  async findTagsByNames(tagNames: string[]): Promise<Tag[] | []> {
    const tags = await this.tagRepository.findByNames(tagNames);
    return tags;
  }

  async createTags(dto: CreateTagDto[], userId: string, tx?: TX): Promise<Tag[]> {
    const tags = dto.map((tag) => new Tag({ name: tag.name, createUser: userId, updateUser: userId }));
    const createdTags = await this.tagRepository.createTags(tags, tx);
    return createdTags;
  }

  async getTags(dto: GetTagsDto): Promise<Tag[]> {
    const { key, value } = dto;

    let tags: Tag[] = [];

    if (key === getTagKeys.ARTICLE_ID) {
      const articleTags = await this.articleTagService.findManyByArticleId(value);
      tags = await this.tagRepository.findManyByIds(articleTags.map((articleTag) => articleTag.tagId));

      tags.sort((a, b) => {
        const aIndex = articleTags.findIndex((articleTag) => articleTag.tagId === a.id);
        const bIndex = articleTags.findIndex((articleTag) => articleTag.tagId === b.id);
        return aIndex - bIndex;
      });
    }

    return tags;
  }
}
