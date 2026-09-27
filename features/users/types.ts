interface Follower {
  followerId: string;
  followingId: string;
  createdAt: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  followers: Follower[];
}
