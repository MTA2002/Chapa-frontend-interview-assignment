import { authHandlers } from "./auth";
import { walletHandlers } from "./wallet";
import { transactionHandlers } from "./transactions";
import { userHandlers } from "./users";
import { statsHandlers } from "./stats";

export const handlers = [
  ...authHandlers,
  ...walletHandlers,
  ...transactionHandlers,
  ...userHandlers,
  ...statsHandlers,
];
