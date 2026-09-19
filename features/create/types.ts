export interface CreatePostResponse {
  success: boolean;
  message: string;
}

export interface PostFormData {
  title: string;
  content: string;
}

export interface Post {
  title: string;
  content: string;
  authorId: string;
}
export interface InputData {
  title: FormDataEntryValue | null;
  content: FormDataEntryValue | null;
}
