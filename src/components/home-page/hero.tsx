"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useAuthStore } from "@/stores/authStore";
import Image from "next/image";

const Hero = () => {
  const t = useTranslations();
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="min-h-screen flex justify-center items-center flex-col gap-16 py-32 px-5 bg-gradient-to-br from-cyan-50 via-white to-teal-50">
      <div className="flex justify-center items-center flex-col gap-8 py-10 max-w-6xl mx-auto">
        <div className="bg-cyan-100 text-cyan-800 px-4 py-2 rounded-full text-sm font-medium">
          {t("hero.badge")}
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-center leading-tight bg-gradient-to-r from-cyan-600 via-teal-600 to-cyan-800 bg-clip-text text-transparent">
          {t("hero.title")}
        </h1>

        <p className="text-center md:text-xl text-gray-600 max-w-3xl leading-relaxed">
          {t("hero.subtitle")}
        </p>

        {isAuthenticated ? (
          <Link
            href="/en/dashboard"
            className="bg-cyan-700 hover:bg-cyan-600 border-2 h-fit border-cyan-700 hover:border-cyan-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            {t("common.dashboard")}
          </Link>
        ) : (
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              href="/en/login"
              className="bg-cyan-700 hover:bg-cyan-600 border-2 h-fit border-cyan-700 hover:border-cyan-600 text-white px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t("common.login")}
            </Link>
            <Link
              href="/en/signup"
              className="bg-white hover:bg-gray-50 text-cyan-700 h-fit border-2 border-cyan-700 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              {t("common.signup")}
            </Link>
          </div>
        )}
      </div>

      {/* Enhanced Dashboard Preview Section */}
      <div className="w-full max-w-6xl mx-auto px-4">
        {/* Dashboard Preview with Enhanced Styling */}
        <div className="relative group">
          {/* Decorative background elements */}
          <div className="absolute -inset-4 bg-gradient-to-r from-cyan-200 via-teal-200 to-cyan-300 rounded-3xl blur-2xl opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
          <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-teal-400 to-cyan-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>

          {/* Main image container */}
          <div className="relative bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-200 group-hover:shadow-3xl transition-all duration-500 group-hover:scale-[1.02]">
            {/* Browser-like header */}
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-gray-200">
              <div className="flex gap-2">
                <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                <div className="w-3 h-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="flex-1 bg-gray-100 rounded-md px-4 py-1 ml-4">
                <span className="text-sm text-gray-500">
                  chapa-psp.com/dashboard
                </span>
              </div>
            </div>

            {/* Dashboard image */}
            <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-gray-50 to-gray-100">
              <Image
                src="/Screenshot 2025-07-15 at 4.51.28 in the afternoon.png"
                alt="Chapa PSP Dashboard Preview - Modern payment processing interface"
                width={1200}
                height={800}
                className="w-full h-auto object-cover object-top hover:scale-105 transition-transform duration-700"
                priority
                quality={90}
              />

              {/* Overlay gradient for better visual effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none"></div>
            </div>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-100">
              <div className="text-center p-3 bg-cyan-50 rounded-lg">
                <div className="w-8 h-8 bg-cyan-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-cyan-700"
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
                <p className="text-sm font-medium text-cyan-800">
                  Secure Payments
                </p>
              </div>

              <div className="text-center p-3 bg-teal-50 rounded-lg">
                <div className="w-8 h-8 bg-teal-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-teal-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-teal-800">
                  Real-time Analytics
                </p>
              </div>

              <div className="text-center p-3 bg-cyan-50 rounded-lg">
                <div className="w-8 h-8 bg-cyan-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-cyan-700"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium text-cyan-800">
                  User Management
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
