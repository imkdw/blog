import { Body, Controller, Inject, Post } from '@nestjs/common';
import { TagService, TagServiceSymbol } from '../types/tag.service';
import RequestCreateTagDto from '../types/dto/request/create-tag.dto';

@Controller({ path: 'tags', version: '1' })
export default class TagController {
  constructor(@Inject(TagServiceSymbol) private readonly tagService: TagService) {}

  @Post()
  async createTag(@Body() dto: RequestCreateTagDto): Promise<void> {
    await this.tagService.createTag(dto);
  }
}
