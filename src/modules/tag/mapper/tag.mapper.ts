import { Injectable } from '@nestjs/common';
import { tags } from '@prisma/client';
import { ITagMapper } from '../interfaces/tag.interface';
import Tag from '../domain/entities/tag.entity';
import { ResponseSearchTagDto } from '../dto/response/tag.dto';

@Injectable()
export default class TagMapper implements ITagMapper {
  toTag(_tag: tags): Tag {
    return new Tag(_tag);
  }

  toResponseSearchTagDto(_tags: Tag[]): ResponseSearchTagDto {
    return {
      tags: _tags.map((tag) => ({
        id: tag.id,
        name: tag.name,
      })),
    };
  }
}
