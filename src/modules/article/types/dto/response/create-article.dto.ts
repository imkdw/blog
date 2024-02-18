import { ApiProperty, PickType } from '@nestjs/swagger';
import Article from '../../../domain/article.entity';

export default class ResponseCreateArticleDto extends PickType(Article, ['id']) {
  @ApiProperty({ description: '생성된 게시글의 아이디', example: 'how-to-create-article-1' })
  id: string;
}
