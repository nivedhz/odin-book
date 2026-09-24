import { VoteType } from "@/lib/generated/prisma/enums";

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  createdAt: Date;
  author: {
    username: string;
  };
}

export interface Vote {
  id?: string;
  type: VoteType;
  postId: string;
  userId: string;
}
