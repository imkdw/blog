import BaseEntity from '../../../../common/domain/base.entity';

export default class Article extends BaseEntity {
  constructor(data: Article) {
    super();
    this.id = data.id;
    this.title = data.title;
    this.userId = data.userId;
    this.summary = data.summary;
    this.content = data.content;
    this.thumbnail = data.thumbnail;
    this.viewCount = data.viewCount;
    this.likeCount = data.likeCount;
    this.commentCount = data.commentCount;
    this.createAt = data.createAt;
  }

  id: string;

  title: string;

  userId: string;

  summary: string;

  content: string;

  thumbnail: string | null;

  viewCount: number = 0;

  likeCount: number = 0;

  commentCount: number = 0;
}
