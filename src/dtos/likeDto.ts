class LikeDto {
  userId: string;
  feedId: number;
  constructor({ userId, feedId }) {
    this.userId = userId;
    this.feedId = feedId;
  }
}

export default LikeDto;
