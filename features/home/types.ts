import { VoteType } from "@/lib/generated/prisma/enums";

export interface Vote {
  id?: string;
  type: VoteType;
  postId: string;
  userId: string;
}
