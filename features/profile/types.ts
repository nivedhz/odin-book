export interface User {
  id: string;
  username: string;
  email: string;
}

export interface UserData {
  username: string;
  email: string;
}
export interface ProfileEditResponse {
  success: boolean;
  message: string;
}
