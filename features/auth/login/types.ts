export interface LoginResponse {
  success: boolean;
  message: string;
}
export interface InputData {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}
export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
}
