export interface ValidatedFields {
  username: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}
export interface User {
  username: string;
  email: string;
  password: string;
}
export interface SignUpResponse {
  success: boolean;
  message: string;
}
