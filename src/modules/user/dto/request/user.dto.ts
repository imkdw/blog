import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { CheckDuplicateType, ICheckDuplicateType } from '../../enums/user.enum';

// eslint-disable-next-line import/prefer-default-export
export class RequestCheckDuplicateQuery {
  @ApiProperty({ description: '데이터 체크 타입', enum: CheckDuplicateType })
  @IsEnum(CheckDuplicateType)
  type: ICheckDuplicateType;

  @ApiProperty({ description: '데이터 값' })
  @IsString()
  value: string;
}
