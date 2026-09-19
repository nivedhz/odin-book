import { CreatePostState, PostFormData } from "./types";

function getFormData(formData: FormData): PostFormData {
  return {
    title: String(formData.get("title")),
    content: String(formData.get("content")),
  };
}

export async function handleCreatePost(
  _prevState: CreatePostState,
  formData: FormData,
): Promise<CreatePostState> {
  const { title, content } = getFormData(formData);
  console.log(title, content);
  return {
    success: true,
    message: "Post created successfully",
  };
}
