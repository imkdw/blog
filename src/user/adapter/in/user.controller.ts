import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('[User] 사용자와 관련된 API')
@Controller({ host: 'user', version: '1' })
export default class UserController {}
