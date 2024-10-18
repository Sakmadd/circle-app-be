class FollowDto {
  userFollowedId: number;
  userFollowingId: number;
  constructor({ userFollowedId, userFollowingId }) {
    this.userFollowedId = userFollowedId;
    this.userFollowingId = userFollowingId;
  }
}

export default FollowDto;
