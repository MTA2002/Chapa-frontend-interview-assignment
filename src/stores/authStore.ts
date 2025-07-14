import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PublicUser, AuthUser } from "@/types";

interface AuthState {
  // State
  user: PublicUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasHydrated: boolean;

  // Actions
  login: (credentials: {
    email: string;
    password: string;
  }) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  checkAuth: () => Promise<void>;
  setHasHydrated: (hydrated: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      hasHydrated: false,

      // Actions
      login: async (credentials) => {
        set({ isLoading: true });

        try {
          const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(credentials),
          });

          const result = await response.json();

          if (!response.ok || !result.success) {
            set({ isLoading: false });
            return {
              success: false,
              message: result.message || "Login failed",
            };
          }

          if (result.data.user.status === "inactive") {
            set({ isLoading: false });
            return {
              success: false,
              message: "Account is inactive",
            };
          }

          const authData: AuthUser = result.data;
          console.log("authData", authData);
          set({
            user: authData.user,
            token: "mock_token", // Simple mock token for MSW
            isAuthenticated: true,
            isLoading: false,
          });

          return { success: true, message: "Login successful" };
        } catch (error) {
          set({ isLoading: false });
          return {
            success: false,
            message: error instanceof Error ? error.message : "Login failed",
          };
        }
      },

      logout: async () => {
        try {
          // Call logout API (no authorization needed for MSW)
          await fetch("/api/auth/logout", {
            method: "POST",
          });
        } catch (error) {
          console.error("Logout API call failed:", error);
        }

        // Clear state regardless of API call result
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      },

      setHasHydrated: (hydrated) => {
        set({ hasHydrated: hydrated });
      },

      checkAuth: async () => {
        const { user, token } = get();

        // Since we're using MSW, we don't need to validate tokens
        // Just check if we have a user in the store
        if (!user || !token) {
          set({ isAuthenticated: false, user: null, token: null });
          return;
        }

        // User exists in store, keep them authenticated
        set({ isAuthenticated: true });
      },
    }),
    {
      name: "chapa-auth", // localStorage key
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
