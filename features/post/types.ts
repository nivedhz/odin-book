export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
  authorId: string;
  postId: string;
}

export interface CommentResponse {
  success: boolean;
  message: string;
}
