import { http, HttpResponse } from "msw";
import { dataManager } from "../data/dataManager";
import { mockTransactions } from "../data";
import { User, UserPaymentSummary, AdminRequest, ApiResponse } from "@/types";

export const userHandlers = [
  // Get all users (for admin/super admin)
  http.get("/api/users", async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return HttpResponse.json({
      success: true,
      data: dataManager.getUsers(),
      message: "Users retrieved",
    });
  }),

  // Update user status (activate/deactivate)
  http.put("/api/users/:userId/status", async ({ params, request }) => {
    const { userId } = params;
    const { status } = (await request.json()) as {
      status: "active" | "inactive";
    };

    await new Promise((resolve) => setTimeout(resolve, 800));

    const updatedUser = dataManager.updateUser(userId as string, { status });

    if (!updatedUser) {
      return HttpResponse.json(
        {
          success: false,
          data: null,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: updatedUser,
      message: `User ${
        status === "active" ? "activated" : "deactivated"
      } successfully`,
    });
  }),

  // Get payment summaries for all users
  http.get("/api/payments/summary", async () => {
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const users = dataManager.getUsers();
    const transactions = dataManager.getTransactions();

    const paymentSummaries: UserPaymentSummary[] = users
      .filter((user) => user.role === "user")
      .map((user) => {
        const userTransactions = transactions.filter(
          (t) => t.userId === user.id
        );
        const totalAmount = userTransactions
          .filter((t) => t.status === "completed")
          .reduce((sum, t) => sum + t.amount, 0);

        return {
          userId: user.id,
          userName: `${user.firstName} ${user.lastName}`,
          totalAmount,
          transactionCount: userTransactions.length,
        };
      });

    return HttpResponse.json({
      success: true,
      data: paymentSummaries,
      message: "Payment summaries retrieved",
    });
  }),

  // Add new admin (super admin only)
  http.post("/api/admins", async ({ request }) => {
    const adminData = (await request.json()) as AdminRequest;

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check if user already exists
    const users = dataManager.getUsers();
    const existingUser = users.find((u) => u.email === adminData.email);
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

    // Create new admin user
    const newAdmin: User = {
      id: `admin_${Date.now()}`,
      email: adminData.email,
      firstName: adminData.firstName,
      lastName: adminData.lastName,
      role: "admin",
      status: "active",
      createdAt: new Date().toISOString(),
      password: "12345678", // Default password
    };

    // Add to persistent storage
    dataManager.addUser(newAdmin);

    return HttpResponse.json({
      success: true,
      data: newAdmin,
      message: "Admin created successfully",
    });
  }),

  // Remove admin (super admin only)
  http.delete("/api/admins/:adminId", async ({ params }) => {
    const { adminId } = params;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Check if admin exists and is actually an admin
    const users = dataManager.getUsers();
    const adminToRemove = users.find(
      (u) => u.id === adminId && u.role === "admin"
    );

    if (!adminToRemove) {
      return HttpResponse.json(
        {
          success: false,
          data: null,
          message: "Admin not found",
        },
        { status: 404 }
      );
    }

    // Remove admin from persistent storage
    const removed = dataManager.removeUser(adminId as string);

    if (!removed) {
      return HttpResponse.json(
        {
          success: false,
          data: null,
          message: "Failed to remove admin",
        },
        { status: 500 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: null,
      message: "Admin removed successfully",
    });
  }),
];
