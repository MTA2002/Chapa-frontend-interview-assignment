"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useAuthStore } from "@/stores/authStore";
import UserDashboard from "@/components/dashboard/UserDashboard";
import AdminDashboard from "@/components/dashboard/AdminDashboard";
import SuperAdminDashboard from "@/components/dashboard/SuperAdminDashboard";
import { Button } from "@/components/ui/button";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { FiMenu, FiX, FiUser, FiLogOut } from "react-icons/fi";
import Link from "next/link";

export default function Dashboard() {
  const { user, isAuthenticated, logout, checkAuth, hasHydrated } =
    useAuthStore();
  const router = useRouter();
  const t = useTranslations();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check authentication on mount
    checkAuth();
  }, [checkAuth]);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest("header")) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("click", handleClickOutside);
      return () => document.removeEventListener("click", handleClickOutside);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    console.log("hasHydrated", hasHydrated);
    console.log("isAuthenticated", isAuthenticated);
    console.log("user", user);

    // Only redirect if hydration is complete and user is not authenticated
    if (hasHydrated && !isAuthenticated && user === null) {
      // Get current locale from the URL
      const pathSegments = window.location.pathname.split("/");
      const locale = pathSegments[1] || "en";
      router.push(`/${locale}/login`);
    }
  }, [hasHydrated, isAuthenticated, user, router]);

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  // Show loading while hydrating or checking auth
  if (!hasHydrated || !isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-700 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("common.loading") || "Loading..."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Dashboard Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto">
          {/* Desktop Header */}
          <div className="flex items-center justify-between">
            <Link href="/">
              {/* Logo and Title */}
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-cyan-600 to-teal-600 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg sm:text-xl font-bold">
                    <span className="text-cyan-600">Chapa</span>
                    <span className="text-gray-700"> PSP</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 capitalize hidden sm:block">
                    {t(`roles.${user.role}`)} {t("common.dashboard")}
                  </p>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <LanguageSwitcher />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="border-red-300 text-red-600 hover:bg-red-50"
              >
                {t("dashboard.logout")}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
              >
                {isMobileMenuOpen ? (
                  <FiX className="h-5 w-5" />
                ) : (
                  <FiMenu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-200">
              <div className="space-y-4">
                {/* User Info */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                    <FiUser className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                    <p className="text-xs text-cyan-600 capitalize">
                      {t(`roles.${user.role}`)} {t("common.dashboard")}
                    </p>
                  </div>
                </div>

                {/* Language Switcher */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">
                    {t("common.language")}
                  </span>
                  <LanguageSwitcher />
                </div>

                {/* Logout Button */}
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="w-full border-red-300 text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  <FiLogOut className="w-4 h-4" />
                  {t("dashboard.logout")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Dashboard Content Based on Role */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {user.role === "user" && <UserDashboard />}
        {user.role === "admin" && <AdminDashboard />}
        {user.role === "super_admin" && <SuperAdminDashboard />}
      </main>
    </div>
  );
}
