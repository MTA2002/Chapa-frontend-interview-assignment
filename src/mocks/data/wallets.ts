import { Wallet } from "@/types";

export const mockWallets: Wallet[] = [
  {
    userId: "user_001",
    balance: 3050, // 5000 - 250 - 1200 - 500 = 3050
    currency: "ETB",
  },
  {
    userId: "user_002",
    balance: 2200, // 3000 - 800 = 2200 (failed transaction doesn't deduct)
    currency: "ETB",
  },
  {
    userId: "user_003",
    balance: 1000, // 1000 (only deposit, inactive user)
    currency: "ETB",
  },
  {
    userId: "user_004",
    balance: 4200, // 7500 - 2000 - 300 - 1000 = 4200
    currency: "ETB",
  },
  {
    userId: "user_005",
    balance: 1870, // 2500 - 450 - 180 = 1870
    currency: "ETB",
  },
];
