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

export interface userMoreDetailType extends UserType {
  followers?: FollowType[];
  followings?: FollowType[];
  feeds?: FeedMoreDetailType[];
}

export interface FollowType {
  id: number;
  followerId: number;
  followingId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface LikeType {
  id: number;
  userId: number;
  feedId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ReplyType {
  id: number;
  image: string;
  content: string;
  createdAt: Date;
  updateAt: Date;
}

export interface FeedType {
  id: number;
  content: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: number;
}

export interface FeedMoreDetailType extends FeedType {
  likes?: LikeType[];
  replies?: ReplyType[];
  author?: UserType;
  isLiked?: boolean;
  totalLikes?: number;
  totalReplies?: number;
}
