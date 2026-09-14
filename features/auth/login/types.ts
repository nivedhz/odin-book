import { ZodError } from "zod";

interface Error {
  _form?: string;
  email?: string;
  password?: string;
  error?: unknown;
}

export interface LoginResponse {
  success: boolean;
  errors?: Error | ZodError<{ email: string; password: string }>;
  message: string;
}
export interface InputData {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
}
