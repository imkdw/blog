import ArticleCommentDto from '../dto/article-comment.dto';
import UserDto from '../../user/dto/user.dto';

export interface ArticleCommentsWithUser extends ArticleCommentDto {
  user: UserDto;
}
