class ReplyDto {
  image: string;
  content: string;
  userId: string;
  feedId: number;

  constructor({ userId, feedId, image, content }) {
    this.content = content;
    this.image = image;
    this.feedId = feedId;
    this.userId = userId;
  }
}

export default ReplyDto;
