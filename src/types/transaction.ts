export type TransactionType = "deposit" | "withdrawal" | "payment";
export type TransactionStatus = "completed" | "pending" | "failed";

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  description: string;
  status: TransactionStatus;
  createdAt: string;
}

export interface TransactionRequest {
  type: TransactionType;
  amount: number;
  description: string;
}
