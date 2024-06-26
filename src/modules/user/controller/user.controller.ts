import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import * as Swagger from '../docs/user.swagger';
import { RequestCheckDuplicateQuery } from '../dto/request/user.dto';
import { ResponseCheckDuplicateDto } from '../dto/response/user.dto';
import { Public } from '../../auth/decorators/public.decorator';
import UserService from '../service/user.service';

@ApiTags('[유저]')
@Controller({ path: 'users', version: '1' })
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Swagger.CheckDuplicate('유저 데이터 중복검사')
  @Public()
  @Get('duplicate')
  async checkDuplicate(@Query() query: RequestCheckDuplicateQuery): Promise<ResponseCheckDuplicateDto> {
    const isDuplicate = await this.userService.checkDuplicate(query.type, query.value);
    return { isDuplicate };
  }
}
