import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import * as Swagger from '../docs/tag.swagger';
import { Public } from '../../auth/decorators/public.decorator';
import { ResponseSearchTagDto } from '../dto/response/tag.dto';
import { toResponseSearchTagDto } from '../mapper/tag.mapper';
import TagService from '../service/tag.service';

@ApiTags('[태그]')
@Controller({ path: 'tags', version: '1' })
export default class TagController {
  constructor(private readonly tagService: TagService) {}

  @Swagger.searchTag('단어로 태그 검색')
  @Public()
  @Get('search/:tagName')
  async searchTag(@Param('tagName') tagName: string): Promise<ResponseSearchTagDto> {
    const tags = await this.tagService.searchTags(tagName);
    return toResponseSearchTagDto(tags);
  }
}
