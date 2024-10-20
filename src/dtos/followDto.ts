class FollowDto {
  followerId: number;
  followingId: number;
  constructor({ followerId, followingId }) {
    this.followerId = followerId;
    this.followingId = followingId;
  }
}

export default FollowDto;
