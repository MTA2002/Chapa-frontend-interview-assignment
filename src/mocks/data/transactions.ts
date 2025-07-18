import { Transaction } from "@/types";

export const mockTransactions: Transaction[] = [
  // User 1 transactions
  {
    id: "tx_001",
    userId: "user_001",
    type: "deposit",
    amount: 5000,
    description: "Initial wallet deposit",
    status: "completed",
    createdAt: "2024-01-15T10:00:00Z",
  },
  {
    id: "tx_002",
    userId: "user_001",
    type: "payment",
    amount: 250,
    description: "Payment to Coffee Shop",
    status: "completed",
    createdAt: "2024-01-16T14:30:00Z",
  },
  {
    id: "tx_003",
    userId: "user_001",
    type: "payment",
    amount: 1200,
    description: "Online shopping payment",
    status: "completed",
    createdAt: "2024-01-18T09:15:00Z",
  },
  {
    id: "tx_004",
    userId: "user_001",
    type: "withdrawal",
    amount: 500,
    description: "Withdraw to bank account",
    status: "pending",
    createdAt: "2024-01-28T16:20:00Z",
  },

  // User 2 transactions
  {
    id: "tx_005",
    userId: "user_002",
    type: "deposit",
    amount: 3000,
    description: "Business account deposit",
    status: "completed",
    createdAt: "2024-01-18T11:00:00Z",
  },
  {
    id: "tx_006",
    userId: "user_002",
    type: "payment",
    amount: 800,
    description: "Supplier payment",
    status: "completed",
    createdAt: "2024-01-19T13:45:00Z",
  },
  {
    id: "tx_007",
    userId: "user_002",
    type: "payment",
    amount: 150,
    description: "Utility bill payment",
    status: "failed",
    createdAt: "2024-01-20T10:30:00Z",
  },

  // User 3 transactions (inactive user)
  {
    id: "tx_008",
    userId: "user_003",
    type: "deposit",
    amount: 1000,
    description: "Initial deposit",
    status: "completed",
    createdAt: "2024-01-20T12:00:00Z",
  },

  // User 4 transactions
  {
    id: "tx_009",
    userId: "user_004",
    type: "deposit",
    amount: 7500,
    description: "Large business deposit",
    status: "completed",
    createdAt: "2024-01-22T15:30:00Z",
  },
  {
    id: "tx_010",
    userId: "user_004",
    type: "payment",
    amount: 2000,
    description: "Rent payment",
    status: "completed",
    createdAt: "2024-01-23T09:00:00Z",
  },
  {
    id: "tx_011",
    userId: "user_004",
    type: "payment",
    amount: 300,
    description: "Restaurant payment",
    status: "completed",
    createdAt: "2024-01-24T19:15:00Z",
  },
  {
    id: "tx_012",
    userId: "user_004",
    type: "withdrawal",
    amount: 1000,
    description: "Cash withdrawal",
    status: "completed",
    createdAt: "2024-01-26T11:45:00Z",
  },

  // User 5 transactions
  {
    id: "tx_013",
    userId: "user_005",
    type: "deposit",
    amount: 2500,
    description: "Weekly business deposit",
    status: "completed",
    createdAt: "2024-01-25T14:20:00Z",
  },
  {
    id: "tx_014",
    userId: "user_005",
    type: "payment",
    amount: 450,
    description: "Equipment purchase",
    status: "completed",
    createdAt: "2024-01-27T16:30:00Z",
  },
  {
    id: "tx_015",
    userId: "user_005",
    type: "payment",
    amount: 180,
    description: "Service subscription",
    status: "pending",
    createdAt: "2024-01-28T10:10:00Z",
  },
];
