export interface UserType {
  id: number;
  username: string;
  email: string;
  name: string;
  password?: string;
  avatar: string;
  banner: string;
  bio: string;
  createdAt: Date;
  updatedAt: Date;
  isFollowed?: boolean;
  filterContent: boolean;
}

export interface FollowType {
  id: number;
  userFollowedId: number;
  userFollowingId: number;
  createdAt: Date;
  updatedAt: Date;
}
