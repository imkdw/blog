import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('[User] 사용자와 관련된 API')
@Controller({ path: 'user', version: '1' })
export default class UserController {}
