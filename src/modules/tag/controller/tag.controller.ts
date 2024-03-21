import { Controller, Get, Inject, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ITagMapper, ITagService, TagMapperKey, TagServiceKey } from '../interfaces/tag.interface';
import * as Swagger from '../docs/tag.swagger';
import { Public } from '../../auth/decorators/public.decorator';
import { ResponseSearchTagDto } from '../dto/response/tag.dto';

@ApiTags('[태그]')
@Controller({ path: 'tags', version: '1' })
export default class TagController {
  constructor(
    @Inject(TagServiceKey) private readonly tagService: ITagService,
    @Inject(TagMapperKey) private readonly tagMapper: ITagMapper,
  ) {}

  @Swagger.searchTag('단어로 태그 검색')
  @Public()
  @Get('search/:tagName')
  async searchTag(@Param('tagName') tagName: string): Promise<ResponseSearchTagDto> {
    const tags = await this.tagService.searchTags(tagName);
    return this.tagMapper.toResponseSearchTagDto(tags);
  }
}
