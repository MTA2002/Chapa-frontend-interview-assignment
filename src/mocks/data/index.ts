// Export original mock data for reference
export { mockUsers } from "./users";
export { mockTransactions } from "./transactions";
export { mockWallets } from "./wallets";

// Export persistent data manager and utilities
export {
  dataManager,
  getPersistentUsers,
  getPersistentTransactions,
  getPersistentWallets,
} from "./dataManager";

// Import dataManager for utility functions
import { dataManager } from "./dataManager";

// Utility to reset all data to defaults (for development/testing)
export const resetMockData = () => {
  if (typeof window !== "undefined") {
    dataManager.resetToDefaults();
    console.log("🔄 All mock data has been reset to defaults");
  }
};

// Utility to clear all persistent data
export const clearMockData = () => {
  if (typeof window !== "undefined") {
    dataManager.clearAllData();
    console.log("🧹 All mock data has been cleared");
  }
};

// Export current data stats for debugging
export const getMockDataStats = () => {
  if (typeof window !== "undefined") {
    return dataManager.getStats();
  }
  return null;
};

// Make dataManager available globally for debugging (development only)
if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
  (window as any).chapaDataManager = {
    dataManager,
    resetData: resetMockData,
    clearData: clearMockData,
    getStats: getMockDataStats,
    exportData: () => dataManager.exportData(),
  };
}
