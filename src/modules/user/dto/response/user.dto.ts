import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

// eslint-disable-next-line import/prefer-default-export
export class ResponseCheckDuplicateDto {
  @ApiProperty({ description: '중복 여부' })
  @IsBoolean()
  isDuplicate: boolean;
}
