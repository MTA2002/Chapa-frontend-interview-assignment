export type UserRole = "user" | "admin" | "super_admin";
export type UserStatus = "active" | "inactive";

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  city?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  password: string;
}
