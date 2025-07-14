"use client";
import React from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { RainbowButton } from "../magicui/rainbow-button";

const Hero = () => {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex justify-center items-center flex-col gap-10 py-32 px-5 bg-gradient-to-br from-cyan-50 via-white to-teal-50">
      {/* Background pattern - we can add this later if needed */}
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

        {/* Hero Image Placeholder */}
        <div className="mt-16 w-full max-w-4xl">
          <div className="bg-gradient-to-r from-cyan-100 to-teal-100 rounded-2xl shadow-2xl p-8 h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="w-32 h-32 bg-cyan-200 rounded-full mx-auto mb-6 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-cyan-600"
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
              <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                {t("hero.dashboard_preview")}
              </h3>
              <p className="text-gray-500">{t("hero.dashboard_description")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
