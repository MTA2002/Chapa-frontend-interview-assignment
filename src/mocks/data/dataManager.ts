import { User, Transaction, Wallet } from "@/types";
import { mockUsers as initialUsers } from "./users";
import { mockTransactions as initialTransactions } from "./transactions";
import { mockWallets as initialWallets } from "./wallets";

// Storage keys
const STORAGE_KEYS = {
  USERS: "chapa_mock_users",
  TRANSACTIONS: "chapa_mock_transactions",
  WALLETS: "chapa_mock_wallets",
  INITIALIZED: "chapa_mock_initialized",
} as const;

// Data manager class for persistent mock data
class DataManager {
  private isClient = typeof window !== "undefined";

  // Initialize data from localStorage or use defaults
  initializeData() {
    if (!this.isClient) return;

    const isInitialized = localStorage.getItem(STORAGE_KEYS.INITIALIZED);

    if (!isInitialized) {
      // First time initialization - store default data
      this.setUsers(initialUsers);
      this.setTransactions(initialTransactions);
      this.setWallets(initialWallets);
      localStorage.setItem(STORAGE_KEYS.INITIALIZED, "true");
      console.log("🔄 Mock data initialized from defaults");
    } else {
      console.log("✅ Mock data loaded from localStorage");
    }
  }

  // Users management
  getUsers(): User[] {
    if (!this.isClient) return initialUsers;

    const stored = localStorage.getItem(STORAGE_KEYS.USERS);
    return stored ? JSON.parse(stored) : initialUsers;
  }

  setUsers(users: User[]): void {
    if (!this.isClient) return;

    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }

  updateUser(userId: string, updates: Partial<User>): User | null {
    const users = this.getUsers();
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) return null;

    users[userIndex] = { ...users[userIndex], ...updates };
    this.setUsers(users);

    console.log(`📝 User ${userId} updated:`, updates);
    return users[userIndex];
  }

  addUser(user: User): void {
    const users = this.getUsers();
    users.push(user);
    this.setUsers(users);

    console.log(`➕ User added:`, user.email);
  }

  removeUser(userId: string): boolean {
    const users = this.getUsers();
    const filteredUsers = users.filter((u) => u.id !== userId);

    if (filteredUsers.length === users.length) return false;

    this.setUsers(filteredUsers);
    console.log(`🗑️ User ${userId} removed`);
    return true;
  }

  // Transactions management
  getTransactions(): Transaction[] {
    if (!this.isClient) return initialTransactions;

    const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return stored ? JSON.parse(stored) : initialTransactions;
  }

  setTransactions(transactions: Transaction[]): void {
    if (!this.isClient) return;

    localStorage.setItem(
      STORAGE_KEYS.TRANSACTIONS,
      JSON.stringify(transactions)
    );
  }

  addTransaction(transaction: Transaction): void {
    const transactions = this.getTransactions();
    transactions.push(transaction);
    this.setTransactions(transactions);

    console.log(`💰 Transaction added:`, transaction.id);
  }

  updateTransaction(
    transactionId: string,
    updates: Partial<Transaction>
  ): Transaction | null {
    const transactions = this.getTransactions();
    const transactionIndex = transactions.findIndex(
      (t) => t.id === transactionId
    );

    if (transactionIndex === -1) return null;

    transactions[transactionIndex] = {
      ...transactions[transactionIndex],
      ...updates,
    };
    this.setTransactions(transactions);

    return transactions[transactionIndex];
  }

  // Wallets management
  getWallets(): Wallet[] {
    if (!this.isClient) return initialWallets;

    const stored = localStorage.getItem(STORAGE_KEYS.WALLETS);
    return stored ? JSON.parse(stored) : initialWallets;
  }

  setWallets(wallets: Wallet[]): void {
    if (!this.isClient) return;

    localStorage.setItem(STORAGE_KEYS.WALLETS, JSON.stringify(wallets));
  }

  addWallet(wallet: Wallet): void {
    const wallets = this.getWallets();
    wallets.push(wallet);
    this.setWallets(wallets);

    console.log(`💳 Wallet added for user ${wallet.userId}`);
  }

  updateWallet(userId: string, updates: Partial<Wallet>): Wallet | null {
    const wallets = this.getWallets();
    const walletIndex = wallets.findIndex((w) => w.userId === userId);

    if (walletIndex === -1) return null;

    wallets[walletIndex] = { ...wallets[walletIndex], ...updates };
    this.setWallets(wallets);

    console.log(`💳 Wallet updated for user ${userId}:`, updates);
    return wallets[walletIndex];
  }

  // Utility methods
  clearAllData(): void {
    if (!this.isClient) return;

    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });

    console.log("🧹 All mock data cleared");
  }

  resetToDefaults(): void {
    if (!this.isClient) return;

    this.clearAllData();
    this.initializeData();

    console.log("🔄 Mock data reset to defaults");
  }

  // Export current data (for debugging)
  exportData() {
    return {
      users: this.getUsers(),
      transactions: this.getTransactions(),
      wallets: this.getWallets(),
    };
  }

  // Get data statistics
  getStats() {
    const users = this.getUsers();
    const transactions = this.getTransactions();
    const wallets = this.getWallets();

    return {
      totalUsers: users.length,
      activeUsers: users.filter((u) => u.status === "active").length,
      totalTransactions: transactions.length,
      completedTransactions: transactions.filter(
        (t) => t.status === "completed"
      ).length,
      totalWallets: wallets.length,
    };
  }
}

// Create and export singleton instance
export const dataManager = new DataManager();

// Initialize data on module load
if (typeof window !== "undefined") {
  dataManager.initializeData();
}

// Export data getters for backward compatibility
export const getPersistentUsers = () => dataManager.getUsers();
export const getPersistentTransactions = () => dataManager.getTransactions();
export const getPersistentWallets = () => dataManager.getWallets();
