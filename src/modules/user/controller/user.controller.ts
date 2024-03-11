import { Controller, Get, Inject, Query } from '@nestjs/common';
import { IUserService, UserServiceKey } from '../interfaces/user.interface';
import * as Swagger from '../docs/user.swagger';
import { RequestCheckDuplicateQuery } from '../dto/request/user.dto';
import { ResponseCheckDuplicateDto } from '../dto/response/user.dto';
import { Public } from '../../../common/decorators/public.decorator';

@Controller({ path: 'users', version: '1' })
export default class UserController {
  constructor(@Inject(UserServiceKey) private readonly userService: IUserService) {}

  @Swagger.CheckDuplicate('유저 데이터 중복검사')
  @Public()
  @Get('duplicate')
  async checkDuplicate(@Query() query: RequestCheckDuplicateQuery): Promise<ResponseCheckDuplicateDto> {
    const isDuplicate = await this.userService.checkDuplicate(query.type, query.value);
    return { isDuplicate };
  }
}
