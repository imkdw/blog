import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

// eslint-disable-next-line import/prefer-default-export
export class RequestCreateCategoryDto {
  @ApiProperty({ description: '카테고리 이름', maximum: 20 })
  @MaxLength(20)
  @IsString()
  readonly name: string;

  @ApiProperty({ description: '카테고리 파라미터', maximum: 50 })
  @MaxLength(50)
  @IsString()
  readonly param: string;

  @ApiProperty({ description: '부모 카테고리 아이디', required: false })
  @IsOptional()
  @IsNumber()
  readonly parentId?: number;
}
