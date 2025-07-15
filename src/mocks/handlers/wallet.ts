import { http, HttpResponse } from "msw";
import { dataManager } from "../data/dataManager";

export const walletHandlers = [
  // Get wallet balance by user ID
  http.get("/api/wallet/balance/:userId", async ({ params }) => {
    const { userId } = params;

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const wallets = dataManager.getWallets();
    const wallet = wallets.find((w) => w.userId === userId);

    if (!wallet) {
      return HttpResponse.json(
        {
          success: false,
          data: null,
          message: "Wallet not found",
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      success: true,
      data: wallet,
      message: "Wallet balance retrieved",
    });
  }),
];
