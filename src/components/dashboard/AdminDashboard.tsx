"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/stores/authStore";
import { User, UserPaymentSummary } from "@/types";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AdminDashboard() {
  const { user } = useAuthStore();
  const t = useTranslations();
  const [users, setUsers] = useState<User[]>([]);
  const [paymentSummaries, setPaymentSummaries] = useState<
    UserPaymentSummary[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  // Fetch all users
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/users");
      const result = await response.json();

      if (result.success) {
        // Filter out admins and super admins (admins only manage regular users)
        const regularUsers = result.data.filter((u: User) => u.role === "user");
        setUsers(regularUsers);
      }
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch payment summaries
  const fetchPaymentSummaries = async () => {
    try {
      const response = await fetch("/api/payments/summary");
      const result = await response.json();

      if (result.success) {
        setPaymentSummaries(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch payment summaries:", error);
    }
  };

  // Toggle user status
  const toggleUserStatus = async (userId: string, currentStatus: string) => {
    setIsUpdating(userId);
    try {
      const newStatus = currentStatus === "active" ? "inactive" : "active";
      const response = await fetch(`/api/users/${userId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(
          newStatus === "active"
            ? t("dashboard.userActivated")
            : t("dashboard.userDeactivated")
        );
        fetchUsers(); // Refresh users list
      } else {
        toast.error(`${t("dashboard.updateUserFailed")}: ${result.message}`);
      }
    } catch (error) {
      console.error("Failed to update user status:", error);
      toast.error(t("dashboard.updateUserFailed"));
    } finally {
      setIsUpdating(null);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPaymentSummaries();
  }, []);

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "text-green-600 bg-green-100"
      : "text-red-600 bg-red-100";
  };

  const activeUsers = users.filter((u) => u.status === "active").length;
  const inactiveUsers = users.filter((u) => u.status === "inactive").length;
  const totalPayments = paymentSummaries.reduce(
    (sum, p) => sum + p.totalAmount,
    0
  );

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          {t("dashboard.adminWelcome")}
        </h2>
        <p className="opacity-90">{t("dashboard.adminMessage")}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t("dashboard.totalUsers")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {users.length}
            </div>
            <p className="text-xs text-gray-500">
              {t("dashboard.registeredMerchants")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t("dashboard.activeUsers")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {activeUsers}
            </div>
            <p className="text-xs text-gray-500">
              {t("dashboard.currentlyActive")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t("dashboard.inactiveUsers")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {inactiveUsers}
            </div>
            <p className="text-xs text-gray-500">
              {t("dashboard.deactivatedAccounts")}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">
              {t("dashboard.totalPayments")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-cyan-600">
              {totalPayments.toLocaleString()} ETB
            </div>
            <p className="text-xs text-gray-500">
              {t("dashboard.allTransactions")}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>👥</span>
              {t("dashboard.userManagement")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-700 mx-auto"></div>
                <p className="text-gray-500 mt-2">
                  {t("dashboard.loadingUsers")}
                </p>
              </div>
            ) : users.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>{t("dashboard.noUsersFound")}</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {users.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">
                          {user.firstName} {user.lastName}
                        </p>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            user.status
                          )}`}
                        >
                          {t(
                            `dashboard.transactionStatuses.${
                              user.status === "active" ? "completed" : "failed"
                            }`
                          )}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <p className="text-xs text-gray-400">
                        {t("dashboard.joined")}{" "}
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button
                      onClick={() => toggleUserStatus(user.id, user.status)}
                      disabled={isUpdating === user.id}
                      variant={
                        user.status === "active" ? "destructive" : "default"
                      }
                      size="sm"
                      className="ml-3"
                    >
                      {isUpdating === user.id
                        ? t("dashboard.updating")
                        : user.status === "active"
                        ? t("dashboard.deactivate")
                        : t("dashboard.activate")}
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Summaries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>💰</span>
              {t("dashboard.paymentsSummary")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {paymentSummaries.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>{t("dashboard.noUsersFound")}</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {paymentSummaries.slice(0, 10).map((summary) => (
                  <div
                    key={summary.userId}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{summary.userName}</p>
                      <p className="text-sm text-gray-500">
                        {summary.transactionCount} transactions
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-cyan-600">
                        {summary.totalAmount.toLocaleString()} ETB
                      </p>
                      <p className="text-xs text-gray-500">
                        {t("dashboard.totalPayments")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Platform Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📊</span>
            {t("dashboard.platformOverview")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">
                {users.length}
              </div>
              <p className="text-sm text-blue-700 font-medium">
                {t("dashboard.totalMerchants")}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {t("dashboard.registeredMerchants")}
              </p>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {((activeUsers / users.length) * 100 || 0).toFixed(1)}%
              </div>
              <p className="text-sm text-green-700 font-medium">
                {t("dashboard.activeRate")}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {t("dashboard.currentlyActive")}
              </p>
            </div>

            <div className="text-center p-4 bg-cyan-50 rounded-lg">
              <div className="text-3xl font-bold text-cyan-600">
                {paymentSummaries.reduce(
                  (sum, p) => sum + p.transactionCount,
                  0
                )}
              </div>
              <p className="text-sm text-cyan-700 font-medium">
                {t("dashboard.totalTransactions")}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {t("dashboard.allPlatformTransactions")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
