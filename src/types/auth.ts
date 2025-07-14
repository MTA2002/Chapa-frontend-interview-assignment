import { User, UserRole } from "./user";

export interface LoginRequest {
  email: string;
  password: string;
}

// User without password for API responses
export interface PublicUser extends Omit<User, "password"> {}

export interface AuthUser {
  user: PublicUser;
  token: string;
}
