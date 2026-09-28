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

export interface PostEditResponse {
  success: boolean;
  message: string;
}
export interface CreatePostResponse {
  success: boolean;
  message: string;
}

export interface PostFormData {
  title: string;
  content: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  authorId?: string;
  createdAt?: Date;
  author?: {
    username: string;
  };
}
export interface InputData {
  title: FormDataEntryValue | null;
  content: FormDataEntryValue | null;
}
