"use client";

import { useEffect, useState } from "react";

export default function MSWProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Only run once in browser
    if (typeof window === "undefined") {
      setIsReady(true);
      return;
    }

    const initializeMSW = async () => {
      try {
        const { worker } = await import("@/mocks/browser");

        await worker.start({
          onUnhandledRequest: "bypass",
          quiet: false,
          serviceWorker: {
            url: "/mockServiceWorker.js",
          },
        });

        // Simple verification that MSW is working
        try {
          const healthCheck = await fetch("/api/health");
          const result = await healthCheck.json();

          if (result.status === "ok") {
            console.log("✅ MSW is working correctly");
          } else {
            console.warn("⚠️ MSW health check returned unexpected result");
          }
        } catch {
          console.warn("⚠️ MSW health check failed, but continuing");
        }

        console.log("🚀 MSW initialization complete");
        setIsReady(true);
      } catch (error) {
        console.error("Failed to start MSW:", error);
        setIsReady(true); // Continue without MSW
      }
    };

    initializeMSW();
  }, []);

  if (!isReady) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
