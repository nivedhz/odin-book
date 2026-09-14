import { ZodError } from "zod";

export interface ValidatedFields {
  username: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}

interface Error {
  _form?: string;
  username?: string;
  email?: string;
  password?: string;
  error?: unknown;
}
export interface User {
  username: string;
  email: string;
  password: string;
}
export interface SignUpResponse {
  success: boolean;
  errors?: Error | ZodError<User>;
  message: string;
}
