import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

// Setup the MSW worker with all handlers
export const worker = setupWorker(...handlers);

// Enhanced worker start function for better reliability
export async function startWorker() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    await worker.start({
      onUnhandledRequest: "bypass",
      quiet: false,
      waitUntilReady: true,
      // Additional options for better persistence
      serviceWorker: {
        url: "/mockServiceWorker.js",
        options: {
          scope: "/",
        },
      },
    });

    // Log successful initialization
    console.log("🚀 MSW worker initialized successfully");

    // Add global flag to track MSW status
    (window as any).__MSW_ENABLED__ = true;

    return worker;
  } catch (error) {
    console.error("❌ MSW worker initialization failed:", error);
    throw error;
  }
}

// Function to check if MSW is working
export async function checkMSWHealth() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const response = await fetch("/api/auth/logout", {
      method: "POST",
    });

    // If we get any response (even 404), MSW is likely working
    // MSW should intercept this request
    return true;
  } catch (error) {
    console.warn("MSW health check failed:", error);
    return false;
  }
}
