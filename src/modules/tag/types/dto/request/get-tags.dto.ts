import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';

export const getTagKeys = {
  ARTICLE_ID: 'articleId',
  TAG_NAME: 'tagName',
} as const;
export type IGetTagKeys = (typeof getTagKeys)[keyof typeof getTagKeys];

export default class RequestGetTagsQuery {
  @ApiProperty({ description: '조회할 태그의 키', enum: getTagKeys })
  @IsEnum(getTagKeys)
  key: IGetTagKeys;

  @ApiProperty({ description: '조회할 태그의 값' })
  @IsString()
  value: string;
}
