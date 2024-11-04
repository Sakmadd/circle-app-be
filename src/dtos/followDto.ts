class FollowDto {
  followerId: string;
  followingId: string;
  constructor({ followerId, followingId }) {
    this.followerId = followerId;
    this.followingId = followingId;
  }
}

export default FollowDto;
