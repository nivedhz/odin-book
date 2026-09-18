export interface LoginResponse {
  success: boolean;
  message: string;
}
export interface InputData {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}
