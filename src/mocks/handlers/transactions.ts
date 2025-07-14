import { http, HttpResponse } from "msw";
import { dataManager } from "../data/dataManager";
import { Transaction, TransactionRequest, ApiResponse } from "@/types";

export const transactionHandlers = [
  // Get transactions for a specific user
  http.get("/api/transactions/:userId", async ({ params }) => {
    const { userId } = params;

    await new Promise((resolve) => setTimeout(resolve, 1000));

    const transactions = dataManager.getTransactions();
    const userTransactions = transactions
      .filter((t) => t.userId === userId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

    return HttpResponse.json({
      success: true,
      data: userTransactions,
      message: "Transactions retrieved",
    });
  }),

  // Create a new transaction
  http.post("/api/transactions", async ({ request }) => {
    const transactionData = (await request.json()) as TransactionRequest & {
      userId: string;
    };

    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Simulate 90% success rate
    const isSuccessful = Math.random() > 0.1;
    const status = isSuccessful ? "completed" : "failed";

    // Create new transaction
    const newTransaction: Transaction = {
      id: `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId: transactionData.userId,
      type: transactionData.type,
      amount: transactionData.amount,
      description: transactionData.description,
      status,
      createdAt: new Date().toISOString(),
    };

    // Add transaction to persistent storage
    dataManager.addTransaction(newTransaction);

    // Update wallet balance if transaction is successful
    if (status === "completed") {
      const wallets = dataManager.getWallets();
      const userWallet = wallets.find(
        (w) => w.userId === transactionData.userId
      );

      if (userWallet) {
        let newBalance = userWallet.balance;

        if (transactionData.type === "deposit") {
          newBalance += transactionData.amount;
        } else if (
          transactionData.type === "withdrawal" ||
          transactionData.type === "payment"
        ) {
          newBalance -= transactionData.amount;
          // Ensure balance doesn't go negative
          if (newBalance < 0) {
            newBalance = 0;
          }
        }

        dataManager.updateWallet(transactionData.userId, {
          balance: newBalance,
        });
      }
    }

    return HttpResponse.json({
      success: true,
      data: newTransaction,
      message: `Transaction ${status}`,
    });
  }),
];
