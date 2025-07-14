import { User } from "@/types";

export const mockUsers: User[] = [
  // Super Admin (seeded)
  {
    id: "super_001",
    email: "superadmin@chapa.co",
    firstName: "Abebe",
    lastName: "Kebede",
    role: "super_admin",
    status: "active",
    createdAt: "2024-01-01T00:00:00Z",
    password: "12345678",
  },

  // Admin Users (added by super admin)
  {
    id: "admin_001",
    email: "admin1@chapa.co",
    firstName: "Almaz",
    lastName: "Tesfaye",
    role: "admin",
    status: "active",
    createdAt: "2024-01-05T10:30:00Z",
    password: "12345678",
  },
  {
    id: "admin_002",
    email: "admin2@chapa.co",
    firstName: "Dawit",
    lastName: "Haile",
    role: "admin",
    status: "active",
    createdAt: "2024-01-10T14:20:00Z",
    password: "12345678",
  },

  // Regular Users (self-registered)
  {
    id: "user_001",
    email: "merchant1@gmail.com",
    firstName: "Hanan",
    lastName: "Mohammed",
    role: "user",
    status: "active",
    createdAt: "2024-01-15T09:15:00Z",
    password: "12345678",
  },
  {
    id: "user_002",
    email: "merchant2@gmail.com",
    firstName: "Kalkidan",
    lastName: "Assefa",
    role: "user",
    status: "active",
    createdAt: "2024-01-18T16:45:00Z",
    password: "12345678",
  },
  {
    id: "user_003",
    email: "merchant3@gmail.com",
    firstName: "Bereket",
    lastName: "Girma",
    role: "user",
    status: "inactive",
    createdAt: "2024-01-20T11:30:00Z",
    password: "12345678",
  },
  {
    id: "user_004",
    email: "merchant4@gmail.com",
    firstName: "Tigist",
    lastName: "Wondimu",
    role: "user",
    status: "active",
    createdAt: "2024-01-22T13:10:00Z",
    password: "12345678",
  },
  {
    id: "user_005",
    email: "merchant5@gmail.com",
    firstName: "Yohannes",
    lastName: "Tadesse",
    role: "user",
    status: "active",
    createdAt: "2024-01-25T08:20:00Z",
    password: "12345678",
  },
];
