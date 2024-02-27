import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RequestGetParentCategories {
  @ApiProperty({ description: '부모 카테고리 param', example: 'backend' })
  @IsString()
  readonly parentParam: string | null;
}

export class RequestGetChildCategories {
  @ApiProperty({ description: '부모 카테고리 param', example: 'backend' })
  @IsString()
  readonly parentParam: string | null;
}
