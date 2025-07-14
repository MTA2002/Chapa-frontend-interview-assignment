"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Menu, User } from "lucide-react";
import { useAuthStore } from "@/stores/authStore";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname();
  const t = useTranslations();
  const { isAuthenticated, user, logout } = useAuthStore();

  const navItems = [
    { label: t("navigation.home"), href: "/" },
    { label: t("navigation.features"), href: "#features" },
    { label: t("navigation.contact"), href: "#contact" },
  ];

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  const currentLocale = pathname.startsWith("/en") ? "en" : "am";

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header
      className={`fixed w-full px-5 py-4 md:px-14 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/75 backdrop-blur-lg shadow-md" : "bg-transparent"
      } ${!isLoaded ? "opacity-0" : "opacity-100"}`}
      aria-label="Site header"
    >
      <nav className="flex justify-between items-center w-full max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-600 to-teal-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
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
            <span className="text-xl font-bold">
              <span className="text-cyan-600">Chapa</span>
              <span className="text-gray-700"> PSP</span>
            </span>
          </Link>
        </div>

        <ul className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="font-medium text-sm hover:text-cyan-600 transition-colors duration-200"
                aria-current={pathname === item.href ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex gap-4 items-center text-sm">
          <LanguageSwitcher />
          {isAuthenticated && user ? (
            <>
              <Link
                href={`/${currentLocale}/dashboard`}
                className="bg-cyan-700 text-white px-6 py-2 rounded-md font-medium hover:bg-cyan-600 transition-colors flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                My Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md font-medium transition-colors"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href={`/${currentLocale}/login`}
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-md font-medium transition-colors"
              >
                {t("common.login")}
              </Link>
              <Link
                href={`/${currentLocale}/signup`}
                className="bg-cyan-700 text-white px-6 py-2 rounded-md font-medium hover:bg-cyan-600 transition-colors"
              >
                {t("common.signup")}
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                className="flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors"
                aria-label="Toggle menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 py-10 px-4">
              <div className="flex flex-col gap-6">
                <nav className="flex flex-col gap-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-gray-700 font-medium py-2 hover:text-cyan-600 transition-colors"
                      aria-current={pathname === item.href ? "page" : undefined}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                  {isAuthenticated && user ? (
                    <>
                      <Link
                        href={`/${currentLocale}/dashboard`}
                        className="bg-cyan-700 text-white px-4 py-3 rounded-md font-medium hover:bg-cyan-600 text-center transition-colors flex items-center justify-center gap-2"
                        onClick={() => setIsOpen(false)}
                      >
                        <User className="w-4 h-4" />
                        My Dashboard
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-md font-medium text-center transition-colors"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href={`/${currentLocale}/login`}
                        className="bg-gray-100 hover:bg-gray-200 px-4 py-3 rounded-md font-medium text-center transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {t("common.login")}
                      </Link>
                      <Link
                        href={`/${currentLocale}/signup`}
                        className="bg-cyan-700 text-white px-4 py-3 rounded-md font-medium hover:bg-cyan-600 text-center transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {t("common.signup")}
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Header;
