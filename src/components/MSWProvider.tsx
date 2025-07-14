"use client";

import { useEffect, useState } from "react";

let isWorkerStarted = false;

export default function MSWProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function initMSW() {
      if (typeof window === "undefined" || isWorkerStarted) {
        setIsReady(true);
        return;
      }

      try {
        const { startWorker, checkMSWHealth } = await import("@/mocks/browser");

        // Check if MSW is already working
        const isHealthy = await checkMSWHealth();
        if (isHealthy && (window as any).__MSW_ENABLED__) {
          console.log("✅ MSW is already running");
          isWorkerStarted = true;
          setIsReady(true);
          return;
        }

        // Start the worker with enhanced options
        await startWorker();

        isWorkerStarted = true;
        console.log("✅ MSW worker started successfully");

        // Add event listeners to handle worker state changes
        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.addEventListener("message", (event) => {
            if (event.data && event.data.type === "MOCKING_ENABLED") {
              console.log("🔄 MSW mocking enabled");
            }
          });

          navigator.serviceWorker.addEventListener("controllerchange", () => {
            console.log("🔄 Service worker controller changed");
          });
        }

        setIsReady(true);
      } catch (error) {
        console.error("❌ Failed to start MSW worker:", error);

        // Retry logic for failed MSW initialization
        setTimeout(() => {
          console.log("🔄 Retrying MSW initialization...");
          isWorkerStarted = false;
          initMSW();
        }, 2000);
      }
    }

    initMSW();

    // Cleanup function
    return () => {
      // Don't stop the worker on cleanup to maintain persistence
    };
  }, []);

  // Add a visibility change handler to restart MSW if needed
  useEffect(() => {
    const handleVisibilityChange = async () => {
      if (document.visibilityState === "visible" && isWorkerStarted) {
        // Check if MSW is still working
        try {
          const { checkMSWHealth } = await import("@/mocks/browser");
          const isHealthy = await checkMSWHealth();

          if (!isHealthy || !(window as any).__MSW_ENABLED__) {
            console.warn("⚠️ MSW is not responding, attempting restart...");
            isWorkerStarted = false;
            (window as any).__MSW_ENABLED__ = false;
            // Trigger re-initialization
            setIsReady(false);
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        } catch (error) {
          console.warn("⚠️ MSW health check failed:", error);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  // Periodic health check for MSW
  useEffect(() => {
    if (!isWorkerStarted) return;

    const healthCheckInterval = setInterval(async () => {
      try {
        const { checkMSWHealth } = await import("@/mocks/browser");
        const isHealthy = await checkMSWHealth();

        if (!isHealthy) {
          console.warn(
            "🔄 MSW periodic health check failed, marking for restart"
          );
          isWorkerStarted = false;
          (window as any).__MSW_ENABLED__ = false;
        }
      } catch (error) {
        console.warn("⚠️ MSW periodic health check error:", error);
      }
    }, 30000); // Check every 30 seconds

    return () => {
      clearInterval(healthCheckInterval);
    };
  }, [isWorkerStarted]);

  // Show loading state while MSW is initializing
  if (!isReady) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-700 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing application...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
