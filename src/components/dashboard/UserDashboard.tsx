"use client";

import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/stores/authStore";
import { Transaction, Wallet, TransactionRequest } from "@/types";
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

const transactionSchema = z.object({
  type: z.enum(["deposit", "withdrawal", "payment"]),
  amount: z.number().min(1, "Amount must be greater than 0"),
  description: z.string().min(1, "Description is required"),
});

export default function UserDashboard() {
  const { user } = useAuthStore();
  const t = useTranslations();
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTransactionLoading, setIsTransactionLoading] = useState(false);

  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      type: "deposit",
      amount: 0,
      description: "",
    },
  });

  // Fetch wallet balance
  const fetchWallet = async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/wallet/balance/${user.id}`);
      const result = await response.json();

      if (result.success) {
        setWallet(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch wallet:", error);
    }
  };

  // Fetch user transactions
  const fetchTransactions = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const response = await fetch(`/api/transactions/${user.id}`);
      const result = await response.json();

      if (result.success) {
        setTransactions(result.data);
      }
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Create new transaction
  const onSubmit = async (values: z.infer<typeof transactionSchema>) => {
    if (!user) return;

    setIsTransactionLoading(true);
    try {
      const response = await fetch("/api/transactions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          userId: user.id,
        }),
      });

      const result = await response.json();

      if (result.success) {
        const status = result.data.status;
        if (status === "completed") {
          toast.success(t("dashboard.transactionSuccess"));
        } else if (status === "pending") {
          toast.success(t("dashboard.transactionPending"));
        } else {
          toast.error(t("dashboard.transactionFailed"));
        }
        form.reset();
        // Refresh data
        fetchWallet();
        fetchTransactions();
      } else {
        toast.error(`${t("dashboard.transactionFailed")}: ${result.message}`);
      }
    } catch (error) {
      console.error("Transaction failed:", error);
      toast.error(t("dashboard.transactionFailed"));
    } finally {
      setIsTransactionLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchWallet();
      fetchTransactions();
    }
  }, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "failed":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "deposit":
        return "⬇️";
      case "withdrawal":
        return "⬆️";
      case "payment":
        return "💳";
      default:
        return "💰";
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          {t("dashboard.welcome", { name: user?.firstName || "" })}
        </h2>
        <p className="opacity-90">{t("dashboard.welcomeMessage")}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Wallet Balance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>💰</span>
              {t("dashboard.walletBalance")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-cyan-700">
              {wallet
                ? `${wallet.balance.toLocaleString()} ${wallet.currency}`
                : t("common.loading")}
            </div>
            <p className="text-sm text-gray-500 mt-2">
              {t("dashboard.availableBalance")}
            </p>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>📊</span>
              {t("dashboard.quickStats")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">
                  {t("dashboard.totalTransactions")}
                </span>
                <span className="font-medium">{transactions.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">
                  {t("dashboard.completedTransactions")}
                </span>
                <span className="font-medium text-green-600">
                  {
                    transactions.filter((tx) => tx.status === "completed")
                      .length
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">
                  {t("dashboard.pendingTransactions")}
                </span>
                <span className="font-medium text-yellow-600">
                  {transactions.filter((tx) => tx.status === "pending").length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transaction Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>💸</span>
              {t("dashboard.newTransaction")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("dashboard.transactionType")}</FormLabel>
                      <FormControl>
                        <select
                          {...field}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                        >
                          <option value="deposit">
                            {t("dashboard.transactionTypes.deposit")}
                          </option>
                          <option value="withdrawal">
                            {t("dashboard.transactionTypes.withdrawal")}
                          </option>
                          <option value="payment">
                            {t("dashboard.transactionTypes.payment")}
                          </option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("dashboard.amount")}</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
                          {...field}
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("dashboard.description")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("dashboard.description")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full bg-cyan-700 hover:bg-cyan-600"
                  disabled={isTransactionLoading}
                >
                  {isTransactionLoading
                    ? t("dashboard.processing")
                    : t("dashboard.submitTransaction")}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span>📋</span>
            {t("dashboard.transactions")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-700 mx-auto"></div>
              <p className="text-gray-500 mt-2">
                {t("dashboard.loadingTransactions")}
              </p>
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>{t("dashboard.noTransactions")}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {transactions.slice(0, 10).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {getTypeIcon(transaction.type)}
                    </span>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(transaction.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg">
                      {transaction.amount.toLocaleString()} ETB
                    </p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {t(`dashboard.transactionStatuses.${transaction.status}`)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
