import { http, HttpResponse } from "msw";
import { dataManager } from "../data/dataManager";
import { SystemStats, ApiResponse } from "@/types";

export const statsHandlers = [
  // Get system statistics (for super admin dashboard)
  http.get("/api/stats", async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const transactions = dataManager.getTransactions();
    const users = dataManager.getUsers();

    const completedTransactions = transactions.filter(
      (t) => t.status === "completed"
    );
    const totalPayments = completedTransactions.reduce(
      (sum, t) => sum + t.amount,
      0
    );

    const stats: SystemStats = {
      totalPayments,
      activeUsers: users.filter(
        (u) => u.status === "active" && u.role === "user"
      ).length,
      totalUsers: users.filter((u) => u.role === "user").length,
      totalAdmins: users.filter((u) => u.role === "admin").length,
    };

    return HttpResponse.json({
      success: true,
      data: stats,
      message: "System statistics retrieved",
    });
  }),
];
