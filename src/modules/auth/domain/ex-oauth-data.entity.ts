import { externalOAuthData } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

import BaseEntity from '../../../common/domain/base.entity';

export default class ExternalOAuthData extends BaseEntity implements externalOAuthData {
  constructor(data: Partial<ExternalOAuthData>) {
    super();
    Object.assign(this, data);
  }

  @ApiProperty({ description: '고유 ID' })
  id: number;

  @ApiProperty({ description: '이메일' })
  email: string;

  @ApiProperty({ description: '제공자 ID' })
  providerId: number;

  @ApiProperty({ description: '프로필 사진' })
  profile: string;

  @ApiProperty({ description: '데이터' })
  data: string;

  @ApiProperty({ description: '토큰정보, 소셜로그인 인증 요청시 마다 갱신된다' })
  token: string;
}
