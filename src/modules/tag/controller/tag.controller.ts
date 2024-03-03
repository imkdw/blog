import { Body, Controller, Get, Inject, Post, Query, UseGuards } from '@nestjs/common';
import { TagService, TagServiceSymbol } from '../types/tag.service';
import RequestCreateTagDto from '../types/dto/request/create-tag.dto';
import AdminGuard from '../../auth/guards/admin.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRoles } from '../../user/domain/user.entity';
import User, { IUser } from '../../../common/decorators/user.decorator';
import { Public } from '../../../common/decorators/public.decorator';
import * as Swagger from '../docs/tag.swagger';
import RequestGetTagQuery from '../types/dto/request/get-tags.dto';
import ResponseGetTagsDto, { GetTagsDto } from '../types/dto/response/get-tags.dto';

@Controller({ path: 'tags', version: '1' })
export default class TagController {
  constructor(@Inject(TagServiceSymbol) private readonly tagService: TagService) {}

  @Swagger.createTag('태그 생성')
  @Post()
  @UseGuards(AdminGuard)
  @Roles(UserRoles.ADMIN)
  async createTag(@Body() dto: RequestCreateTagDto, @User() user: IUser): Promise<void> {
    await this.tagService.createTag(dto, user.userId);
  }

  @Swagger.getTags('태그 조회')
  @Get()
  @Public()
  async getTags(@Query() query: RequestGetTagQuery): Promise<ResponseGetTagsDto> {
    const { key, value } = query;
    const tags = await this.tagService.getTags({ key, value });
    return { tags: tags.map((tag): GetTagsDto => ({ id: tag.id, name: tag.name })) };
  }
}
