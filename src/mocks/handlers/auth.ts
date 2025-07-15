import { http, HttpResponse } from "msw";
import { dataManager } from "../data/dataManager";
import { LoginRequest, AuthUser, PublicUser } from "@/types";

export const authHandlers = [
  // Login endpoint
  http.post("/api/auth/login", async ({ request }) => {
    const credentials = (await request.json()) as LoginRequest;

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find user by email and validate password
    const users = dataManager.getUsers();
    const user = users.find((u) => u.email === credentials.email);

    if (!user || user.password !== credentials.password) {
      return HttpResponse.json(
        {
          success: false,
          data: null,
          message: "Invalid email or password",
        },
        { status: 401 }
      );
    }

    if (user.status === "inactive") {
      return HttpResponse.json(
        {
          success: false,
          data: null,
          message: "Account is inactive",
        },
        { status: 403 }
      );
    }

    // Remove password from user data before sending to client
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = user;

    // Mock successful login
    const authResponse: AuthUser = {
      user: userWithoutPassword as PublicUser,
      token: "mock_token",
    };

    return HttpResponse.json({
      success: true,
      data: authResponse,
      message: "Login successful",
    });
  }),

  // Logout endpoint
  http.post("/api/auth/logout", async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return HttpResponse.json({
      success: true,
      data: null,
      message: "Logout successful",
    });
  }),

  // User signup endpoint (for normal users only)
  http.post("/api/auth/signup", async ({ request }) => {
    const signupData = (await request.json()) as {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      city: string;
      password: string;
    };

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check if user already exists
    const existingUsers = dataManager.getUsers();
    const existingUser = existingUsers.find(
      (u) => u.email === signupData.email
    );
    if (existingUser) {
      return HttpResponse.json(
        {
          success: false,
          data: null,
          message: "User with this email already exists",
        },
        { status: 400 }
      );
    }

    // Create new user with all provided information
    const newUser = {
      id: `user_${Date.now()}`,
      email: signupData.email,
      firstName: signupData.firstName,
      lastName: signupData.lastName,
      phone: signupData.phone,
      city: signupData.city,
      role: "user" as const,
      status: "active" as const,
      createdAt: new Date().toISOString(),
      password: signupData.password,
    };

    // Add user to persistent storage
    dataManager.addUser(newUser);

    // Automatically create a wallet for the new user
    const newWallet = {
      userId: newUser.id,
      balance: 0, // Start with zero balance
      currency: "ETB" as const,
    };

    // Add wallet to persistent storage
    dataManager.addWallet(newWallet);

    console.log(`✅ New user created: ${newUser.email} with wallet`);

    return HttpResponse.json({
      success: true,
      data: null,
      message: "Account created successfully. Please login to continue.",
    });
  }),
];
