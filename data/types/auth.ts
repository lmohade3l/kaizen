export interface User {
  email: string;
  password: string;
}

export interface SignupFormData extends User {
  confirmPassword: string;
}