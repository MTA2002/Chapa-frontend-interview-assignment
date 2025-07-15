import { authHandlers } from "./auth";
import { userHandlers } from "./users";
import { transactionHandlers } from "./transactions";
import { walletHandlers } from "./wallet";
import { statsHandlers } from "./stats";
import { http, HttpResponse } from "msw";

// Simple health check handler
const healthHandlers = [
  http.get("/api/health", () => {
    return HttpResponse.json({
      status: "ok",
      message: "MSW is working",
      timestamp: new Date().toISOString(),
    });
  }),
];

export const handlers = [
  ...healthHandlers,
  ...authHandlers,
  ...userHandlers,
  ...transactionHandlers,
  ...walletHandlers,
  ...statsHandlers,
];
