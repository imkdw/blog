import { Body, Controller, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';
import { TagService, TagServiceSymbol } from '../types/tag.service';
import RequestCreateTagDto from '../types/dto/request/create-tag.dto';
import AdminGuard from '../../auth/guards/admin.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRoles } from '../../user/domain/user.entity';
import User, { IUser } from '../../../common/decorators/user.decorator';
import ResponseSearchTagsDto from '../types/dto/response/search-tags.dto';
import { Public } from '../../../common/decorators/public.decorator';

@Controller({ path: 'tags', version: '1' })
export default class TagController {
  constructor(@Inject(TagServiceSymbol) private readonly tagService: TagService) {}

  @Post()
  @UseGuards(AdminGuard)
  @Roles(UserRoles.ADMIN)
  async createTag(@Body() dto: RequestCreateTagDto, @User() user: IUser): Promise<void> {
    await this.tagService.createTag(dto, user.userId);
  }

  @Get()
  @Public()
  async searchTags(@Query('name') name: string): Promise<ResponseSearchTagsDto> {
    const searchTags = await this.tagService.searchTags(name);
    return { tags: searchTags };
  }
}
