"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/stores/authStore";
import { User, UserPaymentSummary, SystemStats } from "@/types";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const adminSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
});

export default function SuperAdminDashboard() {
  const { user } = useAuthStore();
  const t = useTranslations();
  const [users, setUsers] = useState<User[]>([]);
  const [admins, setAdmins] = useState<User[]>([]);
  const [paymentSummaries, setPaymentSummaries] = useState<
    UserPaymentSummary[]
  >([]);
  const [systemStats, setSystemStats] = useState<SystemStats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);

  const form = useForm<z.infer<typeof adminSchema>>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
    },
  });

  // Fetch all users
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/users");
      const result = await response.json();

      if (result.success) {
        setUsers(result.data);
        // Separate admins for admin management
        setAdmins(result.data.filter((u: User) => u.role === "admin"));
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

  // Fetch system statistics
  const fetchSystemStats = async () => {
    try {
      const response = await fetch("/api/stats");
      const result = await response.json();

      if (result.success) {
        setSystemStats(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch system stats:", error);
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

  // Create new admin
  const onCreateAdmin = async (values: z.infer<typeof adminSchema>) => {
    setIsCreatingAdmin(true);
    try {
      const response = await fetch("/api/admins", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (result.success) {
        toast.success(t("dashboard.adminAddedSuccess"));
        form.reset();
        fetchUsers();
      } else {
        toast.error(`${t("dashboard.addAdminFailed")}: ${result.message}`);
      }
    } catch (error) {
      console.error("Failed to create admin:", error);
      toast.error(t("dashboard.addAdminFailed"));
    } finally {
      setIsCreatingAdmin(false);
    }
  };

  // Remove admin
  const removeAdmin = async (adminId: string) => {
    if (!confirm(t("dashboard.areYouSure"))) return;

    try {
      const response = await fetch(`/api/admins/${adminId}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        toast.success(t("dashboard.adminRemovedSuccess"));
        fetchUsers();
      } else {
        toast.error(`${t("dashboard.removeAdminFailed")}: ${result.message}`);
      }
    } catch (error) {
      console.error("Failed to remove admin:", error);
      toast.error(t("dashboard.removeAdminFailed"));
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchPaymentSummaries();
    fetchSystemStats();
  }, []);

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "text-green-600 bg-green-100"
      : "text-red-600 bg-red-100";
  };

  const regularUsers = users.filter((u) => u.role === "user");
  const activeUsers = regularUsers.filter((u) => u.status === "active").length;
  const inactiveUsers = regularUsers.filter(
    (u) => u.status === "inactive"
  ).length;

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          {t("dashboard.superAdminWelcome")}
        </h2>
        <p className="opacity-90">{t("dashboard.superAdminMessage")}</p>
      </div>

      {/* System Statistics */}
      {systemStats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                {t("dashboard.totalPayments")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {systemStats.totalPayments.toLocaleString()} ETB
              </div>
              <p className="text-xs text-gray-500">
                {t("dashboard.systemWideVolume")}
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
                {systemStats.activeUsers}
              </div>
              <p className="text-xs text-gray-500">
                {t("dashboard.currentlyActive")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                {t("dashboard.totalUsers")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {systemStats.totalUsers}
              </div>
              <p className="text-xs text-gray-500">
                {t("dashboard.allRegisteredUsers")}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">
                {t("dashboard.totalMerchants")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {systemStats.totalAdmins}
              </div>
              <p className="text-xs text-gray-500">
                {t("dashboard.systemStats")}
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Admin Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>👑</span>
              {t("dashboard.adminManagement")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Create Admin Form */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <h4 className="font-medium mb-3">{t("dashboard.addNewAdmin")}</h4>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onCreateAdmin)}
                  className="space-y-3"
                >
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">
                          {t("dashboard.firstName")}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="John" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">
                          {t("dashboard.lastName")}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm">
                          {t("dashboard.email")}
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="admin@chapa.co" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-purple-600 hover:bg-purple-700"
                    disabled={isCreatingAdmin}
                  >
                    {isCreatingAdmin
                      ? t("dashboard.addingAdmin")
                      : t("dashboard.addAdmin")}
                  </Button>
                </form>
              </Form>
            </div>

            {/* Existing Admins */}
            <div className="space-y-2 max-h-64 overflow-y-auto">
              <h4 className="font-medium text-sm text-gray-600">
                {t("dashboard.users")} ({admins.length})
              </h4>
              {admins.length === 0 ? (
                <p className="text-sm text-gray-500">
                  {t("dashboard.noUsersFound")}
                </p>
              ) : (
                admins.map((admin) => (
                  <div
                    key={admin.id}
                    className="flex items-center justify-between p-2 border rounded"
                  >
                    <div className="flex-1">
                      <p className="font-medium text-sm">
                        {admin.firstName} {admin.lastName}
                      </p>
                      <p className="text-xs text-gray-500">{admin.email}</p>
                    </div>
                    <Button
                      onClick={() => removeAdmin(admin.id)}
                      variant="destructive"
                      size="sm"
                      className="text-xs"
                    >
                      {t("dashboard.removeAdmin")}
                    </Button>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* User Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>👥</span>
              {t("dashboard.userManagement")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {regularUsers.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  <p>{t("dashboard.noUsersFound")}</p>
                </div>
              ) : (
                regularUsers.map((user) => (
                  <div
                    key={user.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-sm">
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
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Button
                      onClick={() => toggleUserStatus(user.id, user.status)}
                      disabled={isUpdating === user.id}
                      variant={
                        user.status === "active" ? "destructive" : "default"
                      }
                      size="sm"
                      className="ml-2"
                    >
                      {isUpdating === user.id
                        ? t("dashboard.updating")
                        : user.status === "active"
                        ? t("dashboard.deactivate")
                        : t("dashboard.activate")}
                    </Button>
                  </div>
                ))
              )}
            </div>
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
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {paymentSummaries.length === 0 ? (
                <div className="text-center py-4 text-gray-500">
                  <p>{t("dashboard.noUsersFound")}</p>
                </div>
              ) : (
                paymentSummaries
                  .sort((a, b) => b.totalAmount - a.totalAmount)
                  .slice(0, 10)
                  .map((summary) => (
                    <div
                      key={summary.userId}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">
                          {summary.userName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {summary.transactionCount} transactions
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm text-purple-600">
                          {summary.totalAmount.toLocaleString()} ETB
                        </p>
                      </div>
                    </div>
                  ))
              )}
            </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-3xl font-bold text-purple-600">
                {users.length}
              </div>
              <p className="text-sm text-purple-700 font-medium">
                {t("dashboard.totalPlatformUsers")}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {t("dashboard.allRolesCombined")}
              </p>
            </div>

            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-3xl font-bold text-green-600">
                {((activeUsers / regularUsers.length) * 100 || 0).toFixed(1)}%
              </div>
              <p className="text-sm text-green-700 font-medium">
                {t("dashboard.userActivityRate")}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {t("dashboard.activeUserPercentage")}
              </p>
            </div>

            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-3xl font-bold text-blue-600">
                {paymentSummaries.reduce(
                  (sum, p) => sum + p.transactionCount,
                  0
                )}
              </div>
              <p className="text-sm text-blue-700 font-medium">
                {t("dashboard.totalTransactions")}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {t("dashboard.allPlatformTransactions")}
              </p>
            </div>

            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-3xl font-bold text-orange-600">
                {admins.length + 1}
              </div>
              <p className="text-sm text-orange-700 font-medium">
                {t("dashboard.adminTeam")}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {t("dashboard.includingSuperAdmin")}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
